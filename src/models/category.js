import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  url: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
    lowercase: true,
  },
});

export const categoryModel = mongoose.model("Category", schema);
