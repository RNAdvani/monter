import express from 'express';
const router = express.Router();
import { addBook, getAllBooks, getSingleBook } from '../controllers/book.controller';
import { isAuthenticated } from '../auth/auth';

router.post('/add', isAuthenticated,addBook);
router.get('/all', getAllBooks);
router.get('/single/:bookId', getSingleBook);


export { router as bookRoutes };