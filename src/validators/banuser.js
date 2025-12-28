import Validator from "fastest-validator";

const v = new Validator();

const schema = {
    phone: {
        type: "string",
        min: 10,
        max: 12,
        pattern: /^(\+93|0)7[0-9]{8}$/,
        messages: {
            stringMin: "Phone number must be at least 10 digits",
            stringMax: "Phone number must be at most 12 digits",
            stringPattern: "Phone number must begin with +93 only digits"
        }
    }
}

export const validateBanuser = v.compile(schema);