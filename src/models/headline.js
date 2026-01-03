import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
    trim: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

schema.virtual("sessions", {
  ref: "Session",
  localField: "_id",
  foreignField: "headline",
});

export const headlineModel = mongoose.model("Headline", schema);
