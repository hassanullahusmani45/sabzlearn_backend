import express from "express";
import { banUser } from "../controllers/user.js";

export const banRouter = express.Router();


banRouter.post("/",banUser);