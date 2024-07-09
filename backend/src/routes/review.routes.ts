import express from 'express';
const router = express.Router();
import { addReview} from '../controllers/review.controller';
import { isAuthenticated } from '../auth/auth';

router.post('/add', isAuthenticated,addReview);


export { router as reviewRoutes };