import { asyncHandler , apiError , apiResponse , myApi } from "../utils/index.js";
import { Quiz , Option , Question } from "../models/index.js";

const createQuiz = asyncHandler(async (req, res) => {
  const { link } = req.body;
  const userId = req.user._id;

  if(!userId){
    throw new apiError(401, "Unauthorized request");
  }

  if(!link){
    throw new apiError(400, "Link is required");
  }

  // api call to ml model 
  // Logic to create quiz

  const quiz = await Quiz.create({
    title: "",
    user: userId,
    questions: [],
  });

  return res.status(201).json(new apiResponse(201, quiz, "Quiz created successfully"));
})

export { createQuiz };