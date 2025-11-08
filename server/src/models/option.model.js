import { Schema, model } from "mongoose";

const optionSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Option = model("Option", optionSchema);
