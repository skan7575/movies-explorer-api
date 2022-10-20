require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  celebrate, Joi, errors,
} = require('celebrate');
const usersRoutes = require('./routes/usersRoutes');
const movieRouter = require('./routes/movieRoutes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { NotFoundError } = require('./errors/NotFoundError');
const { handleErrors } = require('./middlewares/handleErrors');

// создаем объект приложения
const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://movies.diplom.nomoredomains.icu', 'http://movies.diplom.nomoredomains.icu'],
}));
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  }),
}), login);
app.use('/users', auth, usersRoutes);
app.use('/movies', auth, movieRouter);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => { handleErrors(err, res, next); });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
