import jwt from 'jsonwebtoken' 


const authUser  = async (req, res, next) => {
    const token = req.header("token");

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // Set userId in the request body
        next(); // Call the next middleware
    } catch (error) {
        console.log("Token verification error:", error);
        return res.status(401).json({ success: false, message: "Token is not valid" });
    }
};

export default authUser;