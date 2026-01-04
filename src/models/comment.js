import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    content: { type: String, required: true, minlength: 5, maxlength: 500 },
    isAccepted: { type: Boolean, default: false },
    isAnswered: { type: Boolean, default: false },
    author: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    course: { type: mongoose.Types.ObjectId, ref: "Course", required: true },
    minCommentID: { type: mongoose.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

schema.virtual("answers", {
  ref: "Comment",
  localField: "_id",
  foreignField: "minCommentID",
});
export const CommentModel = mongoose.model("Comment", schema);
