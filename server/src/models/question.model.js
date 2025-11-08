import { Schema, model } from "mongoose";

const questionSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    options: {
      type: [Schema.Types.ObjectId],
      ref: "Option",
    },
  },
  { timestamps: true }
);

export const Question = model("Question", questionSchema);
