import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: `${process.env.ORIGIN}`,
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));
app.use(cookieparser());

import userRouter from './routes/user.route.js';
app.use('/api/v1/users', userRouter);

import chatRouter from './routes/chat.route.js';
app.use('/api/v1/chats', chatRouter);

import quizRouter from './routes/quiz.route.js';
app.use('/api/v1/quizzes', quizRouter);

import reportRouter from './routes/report.route.js';
app.use('/api/v1/reports', reportRouter);

import recommendationRouter from './routes/recommendation.route.js';
app.use('/api/v1/recommendations', recommendationRouter);

export default app;