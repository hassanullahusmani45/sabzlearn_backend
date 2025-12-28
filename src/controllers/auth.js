import { userModel } from "../models/users.js";
import { validateRegister } from "../validators/register.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, username, email, password, phone } = req.body;
    const result = validateRegister(req.body);

    if (result !== true) {
        return res.status(402).json({
            message: "Validation failed!",
            errors: result
        });
    }

    const isDuplicateUser = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isDuplicateUser) {
        return res.status(409).json({
            message: "Username or Email already exists!"
        });
    }

    const usersCount = await userModel.countDocuments();
    const hasedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        name,
        username,
        email,
        phone,
        password: hasedPassword,
        role: usersCount == 0 ? "ADMIN" : "USER"
    })
    console.log("USER:", user);
    const { password: _, ...safeUser } = user.toObject();

    const accessToken = JWT.sign({ sub: user._id, role: user.role }, process.env.JWT_PRIVITKEY, {
        algorithm: "HS256",
        expiresIn: "5day"
    });

    res.status(201).json({
        message: "User registered successfully",
        user: safeUser,
        accessToken
    });
}



export const login = async (req, res) => {
    console.log("login");
}



export const getMe = async (req, res) => {
    console.log("getMe");
}