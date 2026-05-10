import express from "express"
import cors from "cors"
import helmet from "helmet"
import './models/user.js'

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

import postsRouter from './routes/posts.js';
import tagsRouter from './routes/tags.js';

app.use('/api/posts', postsRouter);
app.use('/api/tags', tagsRouter);

export default app
