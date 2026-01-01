import express from "express";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { create, getCourses } from "../controllers/course.js";

export const courseRouter = express.Router();

courseRouter
  .route("/")
  .post(auth, isAdmin, create)
  .get(auth, isAdmin, getCourses);
