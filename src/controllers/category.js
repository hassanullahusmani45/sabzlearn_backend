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

export const getOneCategory = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(409).json({
      message: "The ID is wrong!",
    });
  }

  const category = await categoryModel.findById(id, "-__v").lean();

  if (!category) {
    return res.status(404).json({
      message: "That category is not found!",
    });
  }
  res.status(200).json(category);
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({}).sort({ _id: -1 }).lean();
    if (!categories.length) {
      return res.status(404).json({
        message: "No categories registered yet.",
        categories: [],
      });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(409).json({
      message: "The ID is wrong!",
    });
  }
  const isFindCategory = await categoryModel.findById(id).lean();
  if (!isFindCategory) {
    return res.status(404).json({
      message: "Not found this category!",
    });
  }
  const { title = isFindCategory.title, url = isFindCategory.url } = req.body;

  try {
    const category = await categoryModel.updateOne({ _id: id }, { title, url });
    res.status(200).json({
      message: "Your Category is Updated Successfuly!",
      updatedCount: category.matchedCount,
    });
  } catch (error) {
    res.json({ message: "Server error!" });
  }
};
