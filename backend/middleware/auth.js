import jwt from 'jsonwebtoken' 

const authUser = async (req, res, next) => {
    try {
        const token = req.header("token");
        if (!token) return res.status(401).json({ message: "No token, authorization denied" });

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

export default authUser;