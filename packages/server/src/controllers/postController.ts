import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const createPost = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Not authenticated' });

  const { content, tags = [] } = req.body;
  const post = await prisma.post.create({
    data: {
      content,
      tags,
      authorId: userId
    }
  });

  res.json(post);
};

export const listPosts = async (_req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: {
      author: { select: { id: true, name: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: 20
  });
  res.json(posts);
};
