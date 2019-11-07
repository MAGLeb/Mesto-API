require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/', router);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status = 500, message } = err;

  res.status(status).send({
    message: message === '' ? "On server error" : err.message
  });
});

app.listen(3000);

module.exports = app;
