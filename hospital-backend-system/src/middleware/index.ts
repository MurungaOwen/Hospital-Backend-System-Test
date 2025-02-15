import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecretkey';

export interface AuthRequest extends Request {
    user?: { id: string; role: string };
}

/**
 * Middleware to authenticate users using JWT.
 */
export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
        req.user = decoded;
        console.log("User: ", decoded)
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
    }
};
