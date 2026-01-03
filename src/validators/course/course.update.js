import Validator from "fastest-validator";

const v = new Validator();

const updateSchema = {
  title: {
    type: "string",
    empty: false,
    min: 3,
    max: 255,
    optional: true,
  },
  description: {
    type: "string",
    empty: false,
    min: 3,
    optional: true,
  },
  status: {
    type: "string",
    enum: ["pre_sale", "completed", "ongoing"],
    optional: true,
  },
  time: {
    type: "number",
    min: 0,
    optional: true,
  },
  support: {
    type: "string",
    enum: ["telegram", "whatsapp", "online"],
    optional: true,
  },
  $$strict: true,
};

export const validatorCourseUpdate = v.compile(updateSchema);
