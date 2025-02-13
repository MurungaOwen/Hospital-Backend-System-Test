import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();
const authController = new AuthController();

router.post('/signup', authController.registerUser);
router.post('/login', authController.loginUser);

export default router;