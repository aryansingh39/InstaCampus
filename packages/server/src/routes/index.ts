import { Router } from 'express';
import authRoutes from './authRoutes';
import postRoutes from './postRoutes';
import commentRoutes from './commentRoutes';
import reactionRoutes from './reactionRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/', commentRoutes); 
router.use('/', reactionRoutes);  

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello InstaCampus Backend!' });
});

export default router;
