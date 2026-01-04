import { courseModel } from "../../models/course.js";

export const checkCourseExists = async (req, res, next) => {
  const { id } = req.params;
  const isfindedCourse = await courseModel.findById(id).lean();
  if (!isfindedCourse) {
    return res.status(404).json({
      message: "This course is not find!",
    });
  }
  req.foundCourse = isfindedCourse;
  next();
};
