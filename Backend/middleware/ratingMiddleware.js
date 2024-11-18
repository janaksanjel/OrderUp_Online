import jwt from 'jsonwebtoken';

const ratauthMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization; // Get token from 'Authorization' header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Unauthorized. Please login again." });
    }

    const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.id; // Attach userId to req.userId
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({ success: false, message: "Unauthorized. Token is invalid." });
    }
};

export default ratauthMiddleware;
