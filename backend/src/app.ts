import express from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/error';
import { userRoutes } from './routes/user.routes';
import { otpRoutes } from './routes/otp.routes';
import { bookRoutes } from './routes/book.routes';
import { reviewRoutes } from './routes/review.routes';
import { connectDB } from './utils/db';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(morgan('dev'));

connectDB();

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/otp', otpRoutes);
app.use("/api/v1/book", bookRoutes)
app.use("/api/v1/review", reviewRoutes)

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 