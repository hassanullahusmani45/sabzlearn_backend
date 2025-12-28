import express from "express";
import { banUser, deleteUser, getUsers, updateUser } from "../controllers/user.js";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";


export const userRouter = express.Router();


userRouter.post("/ban", auth, isAdmin, banUser);
userRouter.get("/", auth, getUsers);
userRouter.delete("/", auth, deleteUser);
userRouter.put("/", auth, updateUser);