import { Schema, model } from "mongoose";

const responseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userInput: {
      type: Schema.Types.ObjectId,
      ref: "UserInput",
      required: true,
    },
    responseType: {
      type: String,
      required: true,
      enum: ["quiz_summary", "recommendation", "chat_completion", "summary"],
      trim: true,
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
    source: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "sourceModel",
    },
    sourceModel: {
      type: String,
      required: true,
      enum: ["Quiz", "Chat", "UserInput", "Summary", "Recommendation"],
    },
  },
  { timestamps: true }
);

export const Response = model("Response", responseSchema);
