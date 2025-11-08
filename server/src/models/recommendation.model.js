import { Schema, model } from "mongoose";

const recommendationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userInputs: {
    type: Schema.Types.ObjectId,
    ref: "UserInput",
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["articles", "videos", "courses"],
  },
  recommendations: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      link: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
},{timestamps: true})

export const Recommendation = model("Recommendation" , recommendationSchema);
