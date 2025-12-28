import { isValidObjectId } from "mongoose";
import { banuserModel } from "../models/banuser.js";
import { userModel } from "../models/users.js";
import { validateBanuser } from "../validators/banuser.js";
import bcrypt from "bcrypt";

export const banUser = async (req, res) => {
    const { phone } = req.body;
    const result = validateBanuser(req.body);

    if (result !== true) {
        return res.status(402).json({
            message: "Validation failed!",
            errors: result
        });
    }

    const banUser = await banuserModel.create({ phone });

    res.status(201).json({
        message: "User is ban successfuly.",
        banUser
    })
}


export const getUsers = async (req, res) => {
    const users = await userModel
        .find({})
        .sort({ createdAt: -1 })
        .lean();

    if (users.length === 0) {
        return res.status(200).json({
            message: "No users found",
            users
        });
    }

    return res.status(200).json({ users });
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        const isValidID = isValidObjectId(id);

        if (!isValidID) {
            return res.status(400).json({
                message: "The user ID is wrong!"
            });
        }

        const user = await userModel.deleteOne({ _id: id });
        if (user.deletedCount > 0) {
            return res.status(200).json({
                message: "User is deleted successfuly."
            });
        }
        res.json({
            message: "User is Not Found by this id!"
        });
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
}



export const updateUser = async (req, res) => {
    try {
        const user = req.authUser;
        const {
            name = user.name,
            username = user.username,
            email = user.email,
            password,
            phone = user.phone
        } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const updatedUser = await userModel.
            findByIdAndUpdate({ _id: user.id }, {
                name,
                username,
                email,
                phone,
                password: hashedPassword
            }).select("-password -__v");

        res.status(200).send({
            message: "Yor info is updated successfuly.",
            updatedUser
        });
    } catch (error) {
        res.status(400).send({ error });
    }
}


export const updateUserRole = async (req, res) => {
    const { id } = req.body;
    const user = await userModel.findOne({ _id: id });
    const updatedRole = user.role === "USER" ? "ADMIN" : "USER";
    const updatedUser = await userModel.findByIdAndUpdate({ _id: id }, { role: updatedRole });

    res.status(201).send({ updatedUser });
}