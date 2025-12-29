import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  title: {
    type: "string",
    required: true,
    min: 2,
    max: 50,
  },
  url: {
    type: "string",
    required: true,
    min: 2,
    max: 50,
  },
};

export const validateCategory = v.compile(schema);
