import { asyncHandler, apiError, apiResponse, myApi } from "../utils/index.js";
import { Recommendation } from "../models/index.js";
import { model } from "../gemini/gemini.js";

const findResources = asyncHandler(async (req, res) => {
  const { topic, weakAreas, userInputId } = req.body;

  if (!userInputId) {
    throw new apiError(400, "userInputId is required to save recommendations.");
  }

  const prompt = `
    Based on the topic "${topic}" and the user's weak areas in "${weakAreas.join(
    ", "
  )}",
    please recommend 3 high-quality articles, 3 videos, and 2 online courses.
    Format the response as a raw JSON object only, with keys "articles", "videos", and "courses".
    Each key should have an array of objects, with each object containing "title" and "link".
    Do not include any markdown formatting like \`\`\`json.
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    const jsonString = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const resources = JSON.parse(jsonString);

    const savedRecommendations = [];

    // Iterate over each category and create a new Recommendation document
    for (const category of Object.keys(resources)) {
      const recommendation = await Recommendation.create({
        user: req.user._id,
        userInputs: userInputId,
        category: category,
        recommendations: resources[category],
      });
      savedRecommendations.push(recommendation);
    }

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          savedRecommendations,
          "Resources generated and saved successfully"
        )
      );
  } catch (error) {
    console.error("Error generating resources from Gemini:", error);
    throw new apiError(500, "Failed to generate resources from AI model.");
  }
});

export { findResources };
