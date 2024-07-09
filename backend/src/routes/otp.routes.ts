import express from 'express';
import { verifyOtp } from '../controllers/otp.controller';

const router = express.Router();

router.post('/verify', verifyOtp);


export const otpRoutes = router;
