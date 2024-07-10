import express from 'express';
import { completeProfile, getUserProfile, loginUser, logout, registerUser } from '../controllers/user.controller';
import { isAuthenticated } from '../auth/auth';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/complete',isAuthenticated, completeProfile);
router.get('/logout',logout);
router.get('/profile',isAuthenticated, getUserProfile);

export const userRoutes = router;