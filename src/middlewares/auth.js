import JWT from "jsonwebtoken";
import { userModel } from "../models/users.js";


export const auth = async (req, res, next) => {
    // const authorizationHeader = req.header("authorization"); // corect but not good
    const authorizationHeader = req.get('Authorization'); //bast practece

    const accessToken = authorizationHeader?.split(" ")[1]

    if (!accessToken?.length) {
        return res.status(401).json({
            message: "Unauthorized. Please login first."
        });
    }

    try {
        const jwtPayload = JWT.verify(accessToken, process.env.JWT_PRIVITKEY);
        const authUser = await userModel.findById({ _id: jwtPayload.id }).select("-password -__v");
        req.authUser = authUser;
        next();
    } catch (error) {
        res.send({ error });
    }
}