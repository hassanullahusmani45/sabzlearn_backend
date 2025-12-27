import express from "express";
import { register, login, getMe } from "../controllers/auth.js"

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/me", getMe);