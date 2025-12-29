import express from "express";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { create, remove } from "../controllers/category.js";

export const categoryRouter = express.Router();

categoryRouter.route("/").post(auth, isAdmin, create);
categoryRouter.delete("/:id", auth, isAdmin, remove);
