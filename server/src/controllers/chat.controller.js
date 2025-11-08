import { asyncHandler, apiError, apiResponse } from "../utils/index.js";
import { Chat, UserInput, Response, Quiz } from "../models/index.js";
// Import other controllers as you build them out
import { createQuiz } from "./quiz.controller.js";
import { model as geminiModel } from "../gemini/gemini.js";

const handleChatInteraction = asyncHandler(async (req, res) => {
  // The `chatId` can be used to continue an existing conversation
  const { userInput, category, chatId} = req.body;
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
  let chat = await Chat.findOne({ _id: chatId, user: user._id, category });

  if (!chat) {
    chat = await Chat.create({
      user: user._id,
      category,
    });
  }

  const inputType = category === "quiz" ? "link" : "query";

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
      // It will handle sending the response.
      return createQuiz(req, res);

    case "summarizer":
      // TODO: Implement summarizer logic, likely calling your ML model
      responseData = { summary: `This is a summary for: "${userInput}"` };
      responseType = "chat_completion";
      source = chat._id;
      sourceModel = "Chat";
      break;

    case "analyzer":
      // TODO: Implement analyzer logic
      responseData = { analysis: `This is an analysis for: "${userInput}"` };
      responseType = "chat_completion";
      source = chat._id;
      sourceModel = "Chat";
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
