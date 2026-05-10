import 'dotenv/config';
import mongoose from 'mongoose';
import app from './src/app.js';
import { watchComments } from './src/changeStreams.js';

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_app';

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB database');
        watchComments();
        console.log('Change Streams aktywne');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error while connecting to MongoDB", err);
        process.exit(1);
    });
