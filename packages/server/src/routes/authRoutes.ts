import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { getCurrentUser } from '../controllers/authController';
import { requireAuth } from '../middlewares/auth';




const router = Router();
router.get('/me', requireAuth, getCurrentUser);

router.post('/register', register);
router.post('/login', login);

export default router;
