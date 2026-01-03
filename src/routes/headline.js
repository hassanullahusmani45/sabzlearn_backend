import express from "express";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isValidID } from "../middlewares/isValidID.js";
import { checkCourseExists } from "../middlewares/course/checkCourseExists .js";
import {
  createHeadline,
  getAllHeadlines,
  getExactCourseHeadlines,
  updateHeadline,
} from "../controllers/headline.js";

export const headlineRouter = express.Router();

headlineRouter
  .route("/")
  .post(auth, isAdmin, createHeadline)
  .get(auth, isAdmin, getAllHeadlines);
headlineRouter
  .route("/course/:id")
  .get(auth, isValidID, checkCourseExists, getExactCourseHeadlines);
headlineRouter.route("/:id").put(auth, isAdmin, isValidID, updateHeadline);
