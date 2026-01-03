import express from "express";
import { authRouter } from "./src/routes/auth.js";
import cros from "cors";
import bodyParser from "body-parser";
import { userRouter } from "./src/routes/user.js";
import { categoryRouter } from "./src/routes/category.js";
import { courseRouter } from "./src/routes/course.js";
import { headlineRouter } from "./src/routes/headline.js";
import { sessionRouter } from "./src/routes/session.js";

export const app = express();

// defult midellwares.
app.use(cros());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/category", categoryRouter);
app.use("/courses", courseRouter);
app.use("/headline", headlineRouter);
app.use("/session", sessionRouter);
