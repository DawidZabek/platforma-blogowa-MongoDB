const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/posts', require('./routes/posts'));
app.use('/api/tags', require('./routes/tags'));

module.exports = app;
