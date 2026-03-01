const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from database to check status
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        if (user.isBlocked) {
            return res.status(403).json({ error: 'Your account has been blocked' });
        }

        if (!user.isActive) {
            return res.status(403).json({ error: 'Your account is inactive' });
        }

        req.user = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ error: 'Token has expired' });
        }
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: `Access denied. Only ${roles.join(', ')} can access this resource`
            });
        }
        next();
    };
};

module.exports = { 
    authenticateToken,
    authorizeRoles 
};
