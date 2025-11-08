import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["summarizer" , "analyzer" , "quiz" , "general"],
    },
  },
  { timestamps: true }
);

export const Chat = model("Chat", chatSchema);
