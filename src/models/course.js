import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 255,
      trim: true,
    },
    href: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 255,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pre_sale", "completed", "ongoing"],
    },
    time: {
      type: Number,
      required: true,
      min: 0,
    },
    support: {
      type: String,
      required: true,
      enum: ["telegram", "whatsapp", "online"],
    },
    courseNeed: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    viewType: {
      type: String,
      required: true,
      enum: ["online", "offline"],
    },
    score: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
    },
    discount: {
      type: Number,
      min: 0,
      default: 0,
    },
    cover: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

schema.virtual("headlines", {
  ref: "Headline",
  localField: "_id",
  foreignField: "course",
});

schema.virtual("sessions", {
  ref: "Session",
  localField: "_id",
  foreignField: "course",
});
export const courseModel = mongoose.model("Course", schema);
