// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, errors, Joi } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');

const errorMessageNotFound = 'resource not found';

const {
  PORT = 3001,
  MONGO_URL = 'mongodb://127.0.0.1:27017',
  NODE_ENV = 'production',
  JWT_SECRET = 'OlyaSimpleSecret',
} = process.env;

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'http://localhost:3000',
];

const app = express();

app.use((req, res, next) => {
  const { origin } = req.headers;

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  const requestHeaders = req.headers['access-control-request-headers'];

  console.log(`origin: ${origin}`);

  if (allowedCors.includes(origin)) {
    console.log('add header');
    res.header('Access-Control-Allow-Origin', origin);
  }

  console.log(`method: ${method}`);

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
});

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(`try connect to ${MONGO_URL}/mestodb !!!!`);

mongoose.connect(`${MONGO_URL}/mestodb`, {
  useNewUrlParser: true,
})
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('connected to db');
  });

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/^(https?:\/\/)(www\.)?[a-z0-9-._~:/?#[\]@!$&()*+,;=]{1,256}\.[a-z]{2,6}\b([a-z0-9-._~:/?#[\]@!$&()*+,;=]*)/i),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => next(new NotFoundError(errorMessageNotFound)));

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
