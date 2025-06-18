import * as dotenv from "dotenv";
dotenv.config({ path: '.env.local' });

import jwt from 'jsonwebtoken';

const authMiddleware = {
    verifyToken: (req, res, next) => {
        const retrievedCookiesToken = res.cookie('jwt_token', req.headers.authorization);
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token && !retrievedCookiesToken) {
            return res.status(403).json({ message: 'No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.userId = decoded.id;
            next();
        });
    },
};

export default authMiddleware