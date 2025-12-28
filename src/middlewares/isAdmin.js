

export const isAdmin = async (req, res, next) => {
    const authUser = req.authUser;

    if (authUser.role !== "ADMIN") {
        return res.status(403).json({
            message: "Forbidden. You are has not Admin role!"
        })
    }

    next();
}