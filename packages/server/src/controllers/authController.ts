import { Request, Response } from 'express';
import prisma from '../prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret123';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, hostel, department, batch } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'User already exists' });

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, hostel, department, batch }
  });

  res.json({ id: user.id, name: user.name, email: user.email });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'none',      // Required for cross-origin cookie (Vercel <-> Render)
    secure: true,          // Must be true on HTTPS (Render uses HTTPS)
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const userInfo = req.user as { id: number }; // safer than @ts-ignore
  if (!userInfo?.id) return res.status(401).json({ error: 'Not authenticated' });

  const user = await prisma.user.findUnique({
    where: { id: userInfo.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      hostel: true,
      department: true,
      batch: true
    }
  });

  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
};
