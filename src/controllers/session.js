import { sessionModel } from "../models/session.js";
import { validatorSession } from "../validators/session.js";

export const createSession = async (req, res) => {
  let { title, time, course, order, isFree, headline } = req.body;
  time = Number(time);
  order = Number(order);
  isFree = isFree === "true";
  const video = req.file?.filename;
  const result = validatorSession({
    title,
    time,
    course,
    order,
    video,
    isFree,
    headline,
  });
  if (result !== true) {
    return res.status(409).json({
      message: "Invalid data!",
      error: result,
    });
  }

  const session = await sessionModel.create({
    title,
    time,
    video,
    course,
    order,
    isFree,
    headline,
  });
  res.status(201).json(session);
};
