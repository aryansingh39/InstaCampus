import { Router } from 'express';
import { toggleReaction, getReactions } from '../controllers/reactionController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.post('/posts/:postId/reactions', requireAuth, toggleReaction);
router.get('/posts/:postId/reactions', getReactions);

export default router;
