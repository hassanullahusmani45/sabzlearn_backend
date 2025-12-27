import express from "express";
import { authRouter } from "./src/routes/auth.js";

export const app = express();


app.use("/auth", authRouter);