import express from 'express';
import { signup, login, getCurrentUser } from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../validations/authValidation.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.get('/me', authMiddleware, getCurrentUser);

export default router;
