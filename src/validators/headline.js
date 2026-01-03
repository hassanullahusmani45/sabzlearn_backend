import Validator from "fastest-validator";

const schema = {
  title: {
    type: "string",
    empty: false,
    min: 2,
    max: 200,
  },
  course: {
    type: "string",
    empty: false,
  },
};

const v = new Validator();
export const validateHeadline = v.compile(schema);
