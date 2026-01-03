import { sessionModel } from "../models/session.js";
import { validatorSession } from "../validators/session.js";

export const createSession = async (req, res) => {
  const result = validatorSession(req.body);
  if (result !== true) {
    return res.status(409).json({
      message: "Invalid data!",
      error: result,
    });
  }

  const { title, time, video, course, order, isFree, headline } = req.body;

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
