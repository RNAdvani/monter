import express from 'express';
const router = express.Router();
import { addBook, getAllBooks, getSingleBook } from '../controllers/book.controller';

router.post('/add', addBook);
router.get('/all', getAllBooks);
router.get('/:bookId', getSingleBook);


export { router as bookRoutes };