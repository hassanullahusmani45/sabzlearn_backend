import Validator from "fastest-validator";

const schema = {
  title: {
    type: "string",
    empty: false,
    min: 3,
    max: 200,
    trim: true,
  },
  time: {
    type: "number",
    optional: true,
    min: 0,
    max: 60,
  },
  video: {
    type: "string",
    empty: false,
  },
  order: {
    type: "number",
    empty: false,
    min: 1,
  },
  isFree: {
    type: "boolean",
    empty: false,
  },
  headline: {
    type: "string",
    empty: false,
  },
  course: {
    type: "string",
    empty: false,
  },
  $$strict: true,
};

const v = new Validator();
export const validatorSession = v.compile(schema);
