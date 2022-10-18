const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require("./routes/usersRoutes");
const movieRouter = require("./routes/movieRoutes");
const auth = require('./middlewares/auth');
const {createUser, login} = require("./controllers/users");
const {NotFoundError} = require("./errors/NotFoundError");
const {
  celebrate, Joi, errors,
} = require('celebrate');
const {handleErrors} = require("./middlewares/handleErrors");

// создаем объект приложения
const {PORT = 3000} = process.env;
const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.post('/signup', createUser)
app.post('/signin', login)
app.use('/users', auth, usersRoutes)
app.use('/movies', auth, movieRouter)
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(errors());
app.use((err, req, res, next) => { handleErrors(err, res, next); });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});