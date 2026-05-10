import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import './models/user.js';
import postsRouter from './routes/posts.js';
import tagsRouter from './routes/tags.js';
import notificationsRouter from './routes/notifications.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/notifications', notificationsRouter);

app.use(errorHandler);

export default app;
