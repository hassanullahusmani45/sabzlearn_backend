import { isValidObjectId } from "mongoose";
import { validatorCourse } from "../validators/course.js";
import { categoryModel } from "../models/category.js";
import { courseModel } from "../models/cource.js";

export const create = async (req, res) => {
  const {
    title,
    href,
    description,
    status,
    time,
    support,
    courseNeed,
    viewType,
    score,
    category,
    price,
    discount,
  } = req.body;

  // 1️⃣ validate body
  const result = validatorCourse(req.body);
  if (result !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result,
    });
  }

  // 2️⃣ validate ObjectId
  if (!isValidObjectId(category)) {
    return res.status(400).json({
      message: "Category id is not valid",
    });
  }

  // 3️⃣ check category existence
  const findedCategory = await categoryModel.findById(category).lean();
  if (!findedCategory) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  try {
    const course = await courseModel.create({
      title,
      href,
      description,
      status,
      time,
      support,
      courseNeed,
      viewType,
      score,
      category,
      price,
      discount,
      creator: req.authUser._id,
    });

    const minCourse = await courseModel
      .findById(course._id)
      .populate("category", "-__v")
      .populate("creator", "name username");
    return res.status(201).json({
      minCourse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getCourses = async (req, res) => {};
