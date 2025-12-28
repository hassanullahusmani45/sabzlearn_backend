import Validator from "fastest-validator";

const v = new Validator({ multi: false });

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