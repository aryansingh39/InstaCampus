import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const toggleReaction = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Not authenticated' });

  const { postId } = req.params;
  const { type } = req.body; // 'UPVOTE', 'DOWNVOTE', 'LIKE'

  try {
    // Check if reaction already exists
    const existing = await prisma.reaction.findUnique({
      where: {
        userId_postId_type: {
          userId,
          postId: parseInt(postId),
          type
        }
      }
    });

    if (existing) {
      // Remove reaction if it exists
      await prisma.reaction.delete({
        where: { id: existing.id }
      });
      res.json({ action: 'removed', type });
    } else {
      // Create new reaction
      await prisma.reaction.create({
        data: {
          userId,
          postId: parseInt(postId),
          type
        }
      });
      res.json({ action: 'added', type });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getReactions = async (req: Request, res: Response) => {
  const { postId } = req.params;
  
  try {
    const reactions = await prisma.reaction.groupBy({
      by: ['type'],
      where: { postId: parseInt(postId) },
      _count: { type: true }
    });

    const counts = reactions.reduce((acc: any, reaction) => {
      acc[reaction.type] = reaction._count.type;
      return acc;
    }, {});

    res.json(counts);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
