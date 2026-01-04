import express from "express";
import { createComment } from "../controllers/comment.js";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

export const commentRouter = express.Router();

commentRouter.route("/").post(auth, isAdmin, createComment);
