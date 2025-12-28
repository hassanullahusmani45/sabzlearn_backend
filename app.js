import express from "express";
import { authRouter } from "./src/routes/auth.js";
import cros from "cors";
import bodyParser from "body-parser";
import { banRouter } from "./src/routes/user.js";
export const app = express();

// defult midellwares.
app.use(cros());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use("/auth", authRouter);
app.use("/users",banRouter);