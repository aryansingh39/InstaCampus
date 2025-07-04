import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret123';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token || '';
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const user = jwt.verify(token, JWT_SECRET);
    // @ts-ignore
    req.user = user; // Attach user to request object for later use
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
