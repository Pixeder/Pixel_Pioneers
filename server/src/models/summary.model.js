import { Schema, model } from "mongoose";

const summarySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    "Detailed Summary": {
      type: String,
      required: true,
    },
    "Key Points / Takeaways": {
      type: [String], // Assuming it's an array of strings
      required: true,
    },
    "Short Summary (TL;DR)": {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Summary = model("Summary", summarySchema);
