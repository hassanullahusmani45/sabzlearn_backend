import express from "express";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  create,
  getCourse,
  getCourses,
  remove,
  update,
} from "../controllers/course.js";
import { isValidID } from "../middlewares/isValidID.js";
import { checkCourseExists } from "../middlewares/course/checkCourseExists .js";
import { imageUploader } from "../utils/imageUploader.js";

export const courseRouter = express.Router();

courseRouter
  .route("/")
  .post(auth, isAdmin, imageUploader.single("cover"), create)
  .get(auth, getCourses);
courseRouter
  .route("/:id")
  .delete(auth, isAdmin, isValidID, checkCourseExists, remove)
  .put(auth, isAdmin, isValidID, checkCourseExists, update)
  .get(isValidID, checkCourseExists, getCourse);
