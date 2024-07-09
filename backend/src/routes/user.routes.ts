import express from 'express';
import { completeProfile, loginUser, registerUser } from '../controllers/user.controller';
import { isAuthenticated } from '../auth/auth';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/complete',isAuthenticated, completeProfile)

export const userRoutes = router;