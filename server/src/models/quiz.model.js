import { Schema, model } from "mongoose";

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Quiz = model("Quiz", quizSchema);
