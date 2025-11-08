import { asyncHandler, apiError, apiResponse, myApi } from "../utils/index.js";
import { Chat, UserInput, Response, Quiz, Summary, Recommendation } from "../models/index.js";
// Import other controllers as you build them out
import { createQuiz } from "./quiz.controller.js";
import { model as geminiModel } from "../gemini/gemini.js";

const handleChatInteraction = asyncHandler(async (req, res, next) => {
  // The `chatId` can be used to continue an existing conversation
  const { userInput, category} = req.body;
  const user = req.user;

  if (!user) {
    throw new apiError(401, "Unauthorized request in chat.controller.js");
  }

  if (!userInput || !category) {
    throw new apiError(
      400,
      "User input and category are required. in chat.controller.js"
    );
  }

  // 1. Find or create a chat session for the user and category
  let chat = await Chat.create({
      user: user._id,
      category,
    });

    

  const inputType = ["quiz", "summarizer"].includes(category) ? "link" : "query";

  // 2. Save the user's message to the UserInput model
  const newUserInput = await UserInput.create({
    user: user._id,
    chat: chat._id, // Link the input to the chat session
    inputType: inputType,
    content: userInput,
  });

  let responseData, responseType, source, sourceModel;

  // 3. Delegate to the appropriate controller/service based on the category
  switch (category) {
    case "quiz":
      // The `createQuiz` is an express handler, so we call it directly.
      // We need to attach the newly created userInput to the request for createQuiz to use
      req.newUserInput = newUserInput;
      req.body.link = userInput;
      // It will handle sending the response.
      return createQuiz(req, res, next);

    case "summarizer":
      try {
        // 1. Call the ML model's /summarize endpoint
        const mlApiResponse = await myApi.post("/summarize", { url: userInput });
        const summaryData = mlApiResponse.data;

        if (!summaryData || !summaryData.summary) {
          throw new apiError(500, "Received invalid summary data from the ML model.");
        }

        // 2. Create a new Summary document
        const newSummary = await Summary.create({
          user: user._id,
          ...summaryData.summary, // Spread the fields from the ML response
        });

        responseData = newSummary;
        responseType = "summary"; // Assuming you'll add 'summary' to your Response model enum
        source = newSummary._id;
        sourceModel = "Summary";
      } catch (error) {
        throw new apiError(500, "Failed to generate summary from the ML model.");
      }
      break;

    case "analyzer":
      try {
        const prompt = `
          Based on the topic "${userInput}", please recommend 3 high-quality articles, 3 videos, and 2 online courses.
          Format the response as a raw JSON object only, with keys "articles", "videos", and "courses".
          Each key should have an array of objects, with each object containing "title" and "link".
          Do not include any markdown formatting like \`\`\`json.
        `;

        const result = await geminiModel.generateContent(prompt);
        const responseText = await result.response.text();
        const jsonString = responseText
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        
        const resources = JSON.parse(jsonString);

        // Save each category of recommendations
        const savedRecommendations = [];
        for (const category of Object.keys(resources)) {
          const recommendation = await Recommendation.create({
            user: user._id,
            userInputs: newUserInput._id,
            category: category,
            recommendations: resources[category],
          });
          savedRecommendations.push(recommendation);
        }

        // The response to the frontend will be the raw JSON from Gemini
        responseData = resources;
        responseType = "recommendation";
        // For the 'Response' model, we can link to the first recommendation created.
        // This is a bit arbitrary, but we need a single source document.
        source = savedRecommendations[0]?._id || chat._id;
        sourceModel = savedRecommendations[0] ? "Recommendation" : "Chat";

      } catch (error) {
        console.error("Error in analyzer:", error);
        throw new apiError(500, "Failed to find resources for the given topic.");
      }
      break;

    case "general":
      // Handle general conversation with Gemini
      const result = await geminiModel.generateContent(userInput);
      const geminiResponse = await result.response.text();
      responseData = { message: geminiResponse };
      responseType = "chat_completion";
      source = chat._id;
      sourceModel = "Chat";
      break;

    default:
      throw new apiError(400, "Invalid chat category provided.");
  }

  // 4. Save the generated response to the database
  await Response.create({
    user: user._id,
    userInput: newUserInput._id,
    responseType,
    content: responseData,
    source,
    sourceModel,
  });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        chatId: chat._id,
        ...responseData,
      },
      "Chat processed successfully."
    )
  );
});

const getChatHistory = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const userId = req.user._id;

  if (!chatId) {
    throw new apiError(400, "Chat ID is required.");
  }

  // Verify the chat belongs to the user
  const chat = await Chat.findOne({ _id: chatId, user: userId });
  if (!chat) {
    throw new apiError(404, "Chat not found or access denied.");
  }

  // Fetch all user inputs for this chat
  const userInputs = await UserInput.find({ chat: chatId }).lean();
  const userInputIds = userInputs.map((input) => input._id);

  // Fetch all responses linked to those user inputs
  const responses = await Response.find({ userInput: { $in: userInputIds } })
    .populate({
      path: "source",
      // Populate quiz details if the source is a Quiz
      populate: { path: "questions", model: "Question" },
    })
    .lean();

  // Map responses to their corresponding user input for easy lookup
  const responseMap = new Map();
  responses.forEach((response) => {
    responseMap.set(response.userInput.toString(), response);
  });

  // Combine user inputs and their responses
  const history = userInputs.map((input) => {
    const response = responseMap.get(input._id.toString());
    return {
      userInput: input,
      response: response || null, // Include the response if it exists
    };
  });

  // The history is already sorted by default as we query UserInputs in order.

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { chat, history },
        "Chat history fetched successfully."
      )
    );
});

const getAllUserChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const chats = await Chat.find({ user: userId }).sort({ updatedAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, chats, "All user chats fetched successfully."));
});

export { handleChatInteraction, getChatHistory, getAllUserChats };
