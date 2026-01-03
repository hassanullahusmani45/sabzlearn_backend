import { isValidObjectId } from "mongoose";

export const isValidID = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "ID is inVlalid!",
    });
  }

  next();
};
