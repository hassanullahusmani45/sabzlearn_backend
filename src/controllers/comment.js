import { CommentModel } from "../models/comment.js";
import { validateComment } from "../validators/comment.js";

export const createComment = async (req, res) => {
  // Logic to create a comment
  const author = req.authUser;
  const { content, isAccepted, isAnswered, course, minCommentID } = req.body;

  const result = validateComment(req.body);
  if (result !== true) {
    return res
      .status(409)
      .json({ message: "Validation is fild!", errors: result });
  }

  const newComment = await CommentModel.create({
    content,
    isAccepted,
    isAnswered,
    course,
    author,
    minCommentID,
  });
  return res.status(201).json(newComment);
};
