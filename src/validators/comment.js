import Validator from "fastest-validator";

const v = new Validator();

export const commentSchema = {
  content: { type: "string", min: 5, max: 500 },
  isAccepted: { type: "boolean", optional: true },
  isAnswered: { type: "boolean", optional: true },
  course: { type: "string", pattern: "^[0-9a-fA-F]{24}$" },
  minCommentID: {
    type: "string",
    pattern: "^[0-9a-fA-F]{24}$",
    optional: true,
  },
  $$strict: true,
};

export const validateComment = v.compile(commentSchema);
