import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  title: {
    type: "string",
    empty: false,
    min: 3,
    max: 255,
  },
  href: {
    type: "string",
    empty: false,
    min: 3,
    max: 255,
  },
  description: {
    type: "string",
    empty: false,
    min: 3,
  },
  status: {
    type: "string",
    empty: false,
    enum: ["pre_sale", "completed", "ongoing"],
  },
  time: {
    type: "number",
    empty: false,
    min: 0,
  },
  support: {
    type: "string",
    empty: false,
    enum: ["telegram", "whatsapp", "online"],
  },
  courseNeed: {
    type: "string",
    empty: false,
    min: 3,
    max: 255,
  },
  viewType: {
    type: "string",
    empty: false,
    enum: ["online", "offline"],
  },
  score: {
    type: "number",
    min: 0,
    max: 5,
  },
  category: {
    type: "string",
    empty: false,
  },
  $$strict: true,
};

export const validatorCourse = v.compile(schema);
