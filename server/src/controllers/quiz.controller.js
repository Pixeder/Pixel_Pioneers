import { asyncHandler, apiError, apiResponse, myApi } from "../utils/index.js";
import { Quiz, Option, Question, Response } from "../models/index.js";

const createQuiz = asyncHandler(async (req, res) => {
  const { link } = req.body;
  const userId = req.user._id;
  const userInput = req.newUserInput; // Attached from chat.controller.js

  if (!userId) {
    throw new apiError(401, "Unauthorized request");
  }

  if (!link) {
    throw new apiError(400, "Link is required");
  }

  // Regex to validate YouTube URLs
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  if (!youtubeRegex.test(link)) {
    throw new apiError(400, "Invalid YouTube link provided.");
  }

  if (!userInput) {
    throw new apiError(400, "User input context is missing.");
  }

  let mlResponse;
  try {
    // 1. API call to the ML model
    const response = await myApi.post("/generate_quiz", { url: link });
    mlResponse = response.data;
  } catch (error) {
    // Log more detailed error information for debugging
    if (error.response) {
      console.error("Error from ML model:", error.response.data);
    } else {
      console.error("Error calling ML model:", error.message);
    }
    throw new apiError(500, "Failed to generate quiz from the ML model.");
  }
  
  if (!mlResponse || !mlResponse.quiz) {
    throw new apiError(500, "Received invalid quiz data from the ML model.");
  }

  // Combine questions from all difficulty levels into a single array
  const allQuestions = [];
  if (mlResponse.quiz.easy_questions) {
    mlResponse.quiz.easy_questions.forEach((q) =>
      allQuestions.push({ ...q, difficulty: "easy" })
  );
}
if (mlResponse.quiz.medium_questions) {
  mlResponse.quiz.medium_questions.forEach((q) =>
    allQuestions.push({ ...q, difficulty: "medium" })
);
}
if (mlResponse.quiz.hard_questions) {
  mlResponse.quiz.hard_questions.forEach((q) =>
    allQuestions.push({ ...q, difficulty: "hard" })
);
}

  const questionIds = [];

  // 2. Create Question and Option documents from the ML response
  for (const questionData of allQuestions) {
    // The ML model returns options as an object {"A": "text", "B": "text"}, not an array.
    // We need to convert it to an array of strings.
    const optionTexts = Object.values(questionData.options);

    const options = await Option.insertMany(
      optionTexts.map((opt) => ({ text: opt }))
    );

    // The ML model uses 'correct_answer' or 'correct' for the key of the correct option.
    const correctOptionKey = questionData.correct_answer || questionData.correct;
    const correctOptionText = questionData.options[correctOptionKey];

    const question = await Question.create({
      text: questionData.question,
      options: options.map((opt) => opt._id),
      correctOption: options.find((opt) => opt.text === correctOptionText)?._id,
      difficulty: questionData.difficulty, // Add difficulty to the question
    });

    questionIds.push(question._id);
  }

  // 3. Create the main Quiz document
  const quiz = await Quiz.create({
    title: mlResponse.title || "Quiz", // Assuming title comes from ML model
    user: userId,
    questions: questionIds,
  });

  // 4. Save the quiz as a Response linked to the user's input
  await Response.create({
    user: userId,
    userInput: userInput._id,
    responseType: "quiz",
    content: { message: "Quiz generated successfully." },
    source: quiz._id,
    sourceModel: "Quiz",
  });

  const populatedQuiz = await Quiz.findById(quiz._id).populate({
    path: "questions",
    populate: { path: "options" },
  });

  return res
    .status(201)
    .json(new apiResponse(201, populatedQuiz, "Quiz created successfully"));
});

export { createQuiz };
