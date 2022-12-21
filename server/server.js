const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users.js');
const anime = require('./routes/anime.js');
const app = express();

const PORT = 1234;
const mongoURI = 'mongodb://localhost/soloprojectdev';
mongoose.connect(mongoURI);

app.use(express.json());

// Test router
app.use('/api/users', users);

// Test anilist api
app.use('/api/anime', anime, (req, res, next) => {
  res.status(200).json(res.locals.data);
});

// Catch all request handler
app.use((req, res, next) => {
  res.status(404).send('Not found');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handle caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultError, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
