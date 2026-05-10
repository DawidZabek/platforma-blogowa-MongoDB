import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import './models/user.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
import postsRouter from './routes/posts.js';
import tagsRouter from './routes/tags.js';
import notificationsRouter from './routes/notifications.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, '..')));

app.use('/api/posts', postsRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/notifications', notificationsRouter);

app.use(errorHandler);

export default app;
