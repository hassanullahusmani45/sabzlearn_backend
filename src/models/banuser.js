import mongoose from "mongoose";

const schema = new mongoose.Schema({
    phone: {
        type: String,
        minlength: 10,
        maxlength: 12,
        trim: true
    },
});

export const banuserModel = mongoose.model("ban", schema);