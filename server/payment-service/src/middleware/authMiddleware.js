const jwt = require('jsonwebtoken');
const axios = require('axios');
const { JWT_SECRET } = require('../config/env');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided or Invalid Format' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const response = await axios.post(
            `http://localhost:4000/auth/verify`,
            {
                token: token
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200) {
            req.user = response.data.user;
            next();
        } else {
            return res.status(401).json({ message: 'Invalid Token' });
        }
    } catch (err) {
        console.error('Authentication error:', err.message);

        if (err.response) {
            return res.status(err.response.status).json({
                message: err.response.data.message || 'Authentication failed'
            });
        } else if (err.request) {
            return res.status(503).json({ message: 'Authentication service unavailable' });
        } else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};


module.exports = { authenticateToken, isAdmin };
