import jwt from 'jsonwebtoken';

// Middleware to authenticate user by checking the JWT token
export const authenticate = (req, res, next) => {
    // Get the token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded; // Add the decoded user data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
};
