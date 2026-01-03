import express from "express";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { createHeadline } from "../controllers/headline.js";

export const headlineRouter = express.Router();

headlineRouter.route("/").post(auth, isAdmin, createHeadline);
