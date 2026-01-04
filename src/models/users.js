import mongoose, { Schema } from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      trim: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 12,
      trim: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.virtual("author", {
  ref: "Comment",
  localField: "_id",
  foreignField: "author",
});
export const userModel = mongoose.model("users", userSchema);
