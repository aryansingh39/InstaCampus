import { Router } from 'express';
import authRoutes from './authRoutes';
import postRoutes from './postRoutes';
// ...



const router = Router();
router.use('/posts', postRoutes);
router.use('/auth', authRoutes);

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello InstaCampus Backend!' });
});

export default router;
