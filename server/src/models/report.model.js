import { Schema, model } from "mongoose";

const reportSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    weakTopics: {
      type: [String],
      default: [],
    },
    strongTopics: {
      type: [String],
      default: [],
    },
    recommendedResources: {
      articles: [
        {
          title: { type: String, trim: true },
          link: { type: String, trim: true },
        },
      ],
      videos: [
        {
          title: { type: String, trim: true },
          link: { type: String, trim: true },
        },
      ],
      courses: [
        {
          title: { type: String, trim: true },
          link: { type: String, trim: true },
        },
      ],
    },
  },
  { timestamps: true }
);

export const Report = model("Report", reportSchema);
