const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const path = require('path');

const { heroesRouter } = require('./src/routes/api/heroesRouter.js');
const { errorHandler } = require('./src/helpers/apiHelpers.js');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
  res.end(`<h1>Heroes API works! `);
});
app.use('/api/heroes', heroesRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Oops! Not found' });
});

app.use(errorHandler);

module.exports = app;
