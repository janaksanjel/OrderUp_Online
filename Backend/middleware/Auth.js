import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token; // Assuming token is sent in headers

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized. Please login again." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // Attach userId to req.body
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({ success: false, message: "Unauthorized. Token is invalid." });
    }
};

export default authMiddleware;
