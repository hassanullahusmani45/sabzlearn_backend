import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
    },
    order: {
      type: Number,
      required: true,
      min: 1,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Number,
      required: true,
      min: 0,
      max: 60,
      default: 1,
    },
    video: {
      type: String,
      required: true,
    },
    headline: {
      type: mongoose.Types.ObjectId,
      ref: "Headline",
      required: true,
      index: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

schema.index({ headline: 1, order: 1 }, { unique: true });
export const sessionModel = mongoose.model("Session", schema);
