import { isValidObjectId } from "mongoose";
import { headlineModel } from "../models/headline.js";
import { validateHeadline } from "../validators/headline.js";
import { courseModel } from "../models/course.js";

export const createHeadline = async (req, res) => {
  const { title, course } = req.body;

  //1️⃣ check the validation.
  const result = validateHeadline(req.body);
  if (result !== true) {
    return res.status(409).json({
      message: "Validation is faild!",
      error: result,
    });
  }

  //2️⃣ check that courseID
  if (!isValidObjectId(course)) {
    return res.status(400).json({
      message: "The courseID is inVlalid!",
    });
  }
  const isCourseFind = await courseModel.findById(course);
  if (!isCourseFind) {
    return res.status(404).json({
      message: "course is not found please check the ID!",
    });
  }
  //3️⃣ create the Headline
  const headline = await headlineModel.create({ title, course });
  res.status(201).json(headline);
};

export const getAllHeadlines = async (_, res) => {
  const headlines = await headlineModel.find({}).sort({ id: 1 }).lean();
  if (headlines.length <= 0) {
    return res.status(404).json({
      message: "Headline is not Save to Now!",
    });
  }

  res.status(200).json(headlines);
};

export const getExactCourseHeadlines = async (req, res) => {
  const headlines = await headlineModel.find(
    { course: req.foundCourse._id },
    "-course -__v"
  );
  res.status(200).json({ "course-name": req.foundCourse.title, headlines });
};

export const updateHeadline = async (req, res) => {
  const updatedHeadline = await headlineModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).lean();

  if (!updatedHeadline) {
    return res.status(404).json({
      message: "This headline is not found!",
    });
  }

  return res.status(200).json({
    message: "Headline updated successfully",
    data: updatedHeadline,
  });
};

