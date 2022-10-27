require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
 errors,
} = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleErrors } = require('./middlewares/handleErrors');
const routes = require('./routes')

// создаем объект приложения
const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://movies.diplom.nomoredomains.icu', 'http://movies.diplom.nomoredomains.icu'],
}));
mongoose.connect('mongodb://localhost:27017/moviesdb');
app.use(requestLogger);
app.use(routes)
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => { handleErrors(err, res, next); });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
