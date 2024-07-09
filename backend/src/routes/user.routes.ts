import express from 'express';
import { completeProfile, loginUser, registerUser } from '../controllers/user.controller';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/complete', completeProfile)

export const userRoutes = router;