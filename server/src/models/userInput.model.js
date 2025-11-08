import { Schema, model } from "mongoose";

const userInputSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    inputType: {
      type: String,
      required: true,
      enum: ["link" , "query"],
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserInput = model("UserInput", userInputSchema);
