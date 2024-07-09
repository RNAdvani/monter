import express from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/error';
import config from './config';
import { userRoutes } from './routes/user.routes';
import { otpRoutes } from './routes/otp.routes';

const app = express();

app.use(express.json());
app.use(cookieParser());    

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/otp', otpRoutes);

app.use(errorHandler)

app.listen(3000, () => {
    console.log(config.COOKIE_EXPIRE)
    console.log('Server is running on port 3000');
}); 