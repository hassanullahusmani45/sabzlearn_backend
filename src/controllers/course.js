import { isValidObjectId } from "mongoose";
import { validatorCourse } from "../validators/course/course.js";
import { categoryModel } from "../models/category.js";
import { courseModel } from "../models/cource.js";
import { validatorCourseUpdate } from "../validators/course/course.update.js";

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

  const result = validatorCourse(req.body);
  if (result !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result,
    });
  }

  if (!isValidObjectId(category)) {
    return res.status(400).json({
      message: "Category id is not valid",
    });
  }

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

export const getCourses = async (req, res) => {
  try {
    const allCourse = await courseModel
      .find({})
      .populate("category", "-__v")
      .populate("creator", "-__v -password -createdAt -updatedAt");
    return res.status(201).json({
      allCourse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const remove = async (req, res) => {
  const foundCourse = req.foundCourse;

  await courseModel.deleteOne({ _id: foundCourse._id });
  return res.status(200).json({
    message: `${foundCourse.title} Course is Deleted Successfuly.`,
  });
};

export const update = async (req, res) => {
  const course = req.foundCourse;
  const result = validatorCourseUpdate(req.body);
  if (result !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result,
    });
  }
  const updatedCourse = await courseModel
    .findByIdAndUpdate(course._id, req.body)
    .lean();

  return res.status(200).json({
    message: "Course updated successfully",
    data: updatedCourse,
  });
};

export const getCourse = async (req, res) => {
  const course = await courseModel
    .findById(req.foundCourse._id)
    .populate("category","-__v")
    .populate("creator", "-password -__v -createdAt -updatedAt");

  res.status(200).json(course);
};
