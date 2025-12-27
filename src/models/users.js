import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            trim: true
        },
        username: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            trim: true,
            lowercase: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            unique: true

        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
            min: 10,
            max: 12
        },
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER"
        }
    },
    { timestamps: true }
);

export const userModel = mongoose.model("users", userSchema);