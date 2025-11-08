import { asyncHandler, apiError, apiResponse } from "../utils/index.js";
import { Report, Quiz } from "../models/index.js";
import { model as geminiModel } from "../gemini/gemini.js";

const createReport = asyncHandler(async (req, res) => {
  // 1. Get data from the request body (sent from your ML model's analysis)
  const { quizId, weakTopics, strongTopics } = req.body;
  const userId = req.user._id;

  // 2. Validate the input
  if (!quizId || !weakTopics || !strongTopics) {
    throw new apiError(400, "Quiz ID, weak topics, and strong topics are required.");
  }

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new apiError(404, "Quiz not found.");
  }

  let resources = {};

  // 3. If there are weak topics, ask Gemini for study resources
  if (weakTopics.length > 0) {
    const prompt = `
      Based on a user's weak areas in the topic of "${quiz.title}", which are "${weakTopics.join(', ')}",
      please recommend 3 high-quality articles, 3 videos, and 2 online courses to help them improve.
      Format the response as a clean JSON object with keys "articles", "videos", and "courses".
      Each key should hold an array of objects, where each object has a "title" and a "link".
      Do not include any text or markdown formatting before or after the JSON object.
    `;

    try {
      const result = await geminiModel.generateContent(prompt);
      const responseText = await result.response.text();
      // Clean up the response to ensure it's valid JSON
      const jsonString = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      resources = JSON.parse(jsonString);
    } catch (error) {
      console.error("Error generating resources from Gemini:", error);
      throw new apiError(500, "Failed to generate learning resources from AI model.");
    }
  }

  // 4. Create and save the new report to the database
  const report = await Report.create({
    user: userId,
    quiz: quizId,
    weakTopics,
    strongTopics,
    recommendedResources: resources,
  });

  return res.status(201).json(new apiResponse(201, report, "Report generated successfully."));
});

export { createReport };
