import express from 'express';
import Database from './database/connection.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

Database.getInstance();

app.use('/api', router);

app.use(errorMiddleware);

export default app;
