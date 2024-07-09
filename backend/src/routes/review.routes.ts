import express from 'express';
const router = express.Router();
import { addReview} from '../controllers/review.controller';

router.post('/add', addReview);


export { router as reviewRoutes };