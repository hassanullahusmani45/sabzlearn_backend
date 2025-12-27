import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
        },
        username: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 15
        },
        confirmpassword: {
            type: "equal",
            field: "password"
        },
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER"
        }
    },
    { timestamps }
);

export const userModel = mongoose.model("users", userSchema);