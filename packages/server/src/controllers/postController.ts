import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const createPost = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Not authenticated' });

  const { content, tags = [] } = req.body;

  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Content is required' });
  }

  if (!Array.isArray(tags)) {
    return res.status(400).json({ error: 'Tags must be an array' });
  }

  try {
    const post = await prisma.post.create({
      data: {
        content,
        tags,
        authorId: userId
      }
    });

    res.json(post);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to create post' });
  }
};


export const listPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      where: { isActive: true },
      include: {
        author: { select: { id: true, name: true } },
        _count: { select: { comments: true } },
        reactions: {
          select: { type: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    // Process reaction counts for each post
    const postsWithCounts = posts.map(post => {
      const reactionCounts = post.reactions.reduce((acc: any, reaction) => {
        acc[reaction.type] = (acc[reaction.type] || 0) + 1;
        return acc;
      }, {});

      return {
        ...post,
        reactionCounts,
        commentCount: post._count.comments,
        reactions: undefined, // Remove raw reactions
        _count: undefined     // Remove raw count
      };
    });

    res.json(postsWithCounts);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
