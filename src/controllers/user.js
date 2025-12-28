import { banuserModel } from "../models/banuser.js";
import { validateBanuser } from "../validators/banuser.js";

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