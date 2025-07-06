import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const createComment = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Not authenticated' });

  const { postId } = req.params;
  const { content } = req.body;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: userId,
        postId: parseInt(postId)
      },
      include: {
        author: { select: { id: true, name: true } }
      }
    });
    res.status(201).json(comment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getComments = async (req: Request, res: Response) => {
  const { postId } = req.params;
  
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId), isActive: true }, // Using your isActive field!
      include: {
        author: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'asc' }
    });
    res.json(comments);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
