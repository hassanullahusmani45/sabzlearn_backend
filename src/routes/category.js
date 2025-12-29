import express from "express";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  create,
  getAllCategory,
  getOneCategory,
  remove,
  updateCategory,
} from "../controllers/category.js";

export const categoryRouter = express.Router();

categoryRouter.route("/").post(auth, isAdmin, create).get(getAllCategory);

categoryRouter
  .route("/:id")
  .delete(auth, isAdmin, remove)
  .get(auth, getOneCategory)
  .put(auth, isAdmin, updateCategory);
