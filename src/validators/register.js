import Validator from "fastest-validator";

const v = new Validator();

const schema = {
    name: {
        type: "string",
        required: true,
        min: 3,
        max: 55,
    },
    username: {
        type: "string",
        required: true,
        min: 3,
        max: 55,
    },
    email: {
        type: "email",
        required: true
    },
    password: {
        type: "string",
        required: true,
        min: 8,
        max: 15
    },
    confirmpassword: {
        type: "equal",
        field: "password",
        required: true
    },
    role: {
        type: "enum",
        values: ["ADMIN", "USER"],
        default: "USER"
    }
}

export const validateRegister = v.compile(schema);