import jwt from 'jsonwebtoken';

const proauthMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization; // Look for token in Authorization header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized. Please login again.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Attach userId to req object
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ success: false, message: 'Unauthorized. Token is invalid.' });
    }
};

export default proauthMiddleware;
