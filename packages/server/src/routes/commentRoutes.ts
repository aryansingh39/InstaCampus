import { Router } from 'express';
import { createComment, getComments } from '../controllers/commentController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.post('/posts/:postId/comments', requireAuth, createComment);
router.get('/posts/:postId/comments', getComments);

export default router;
