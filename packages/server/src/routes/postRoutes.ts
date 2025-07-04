import { Router } from 'express';
import { createPost, listPosts } from '../controllers/postController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.post('/', requireAuth, createPost);
router.get('/', listPosts);

export default router;
