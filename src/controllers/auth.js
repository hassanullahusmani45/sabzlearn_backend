import { banuserModel } from "../models/banuser.js";
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
    // is ban user?
    const isBanUser = await banuserModel.findOne({ phone });
    if (isBanUser) {
        return res.status(409).json({
            message: "This phone number is ban!"
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

    const accessToken = JWT.sign({ id: user._id, role: user.role }, process.env.JWT_PRIVITKEY, {
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
    const { identifier, password } = req.body;

    const isUserFind = await userModel.findOne({
        $or: [{ username: identifier }, { email: identifier }]
    });
    if (!isUserFind) {
        res.status(401).json({
            message: "user name or email is rong!"
        });
    }

    const isValidPassword = await bcrypt.compare(password, isUserFind.password);
    if (!isValidPassword) {
        res.status(401).json({
            message: "your password is rong!"
        });
    }
    const accessToken = JWT.sign({ id: isUserFind._id, role: isUserFind.role }, process.env.JWT_PRIVITKEY, {
        algorithm: "HS256",
        expiresIn: "5day"
    });

    res.status(200).json({ accessToken });
}



export const getMe = async (req, res) => {
    console.log("getMe");
}