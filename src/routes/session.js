import express from "express";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { createSession } from "../controllers/session.js";

export const sessionRouter = express.Router();

sessionRouter.route("/").post(auth, isAdmin, createSession);
