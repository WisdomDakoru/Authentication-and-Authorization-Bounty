const jwt = require('jsonwebtoken');
const TOKEN_KEY = process.env.TOKEN_KEY || 'StackUpAuthenticationProject!';

// Authentication middleware
const authentication = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

// Authorization middleware
const authorisation = (options) => (req, res, next) => {
    // Implement your own authorization logic here
    next();
};

module.exports = { authentication, authorisation };