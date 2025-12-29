import { isValidObjectId } from "mongoose";
import { categoryModel } from "../models/category.js";
import { validateCategory } from "../validators/category.js";

export const create = async (req, res) => {
  console.log("create");
  const { title, url } = req.body;

  const result = validateCategory(req.body);
  if (result !== true) {
    return res.status(409).json({
      message: "Validation faild!",
      error: result,
    });
  }
  const category = await categoryModel.create({ title, url });
  res.status(201).json(category);
};

export const remove = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(409).json({ message: "The ID is wrong!" });
  }
  const category = await categoryModel.deleteOne({ _id: id });

  res.status(200).json({
    message: "Your seleced category is deleted successfuly.",
    category,
  });
};
