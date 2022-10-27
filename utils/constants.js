const BAD_URL = 'не является URL адресом';
const USER_SCHEMA_REQUIRED_MESSAGES = {
  EMAIL: 'Поле-строка "email - электронная почта" является обязательным',
  PASSWORD: 'Поле-строка "password - пароль" является обязательным',
  NAME: 'Поле-строка "name - имя пользователя" является обязательным',
};
const USER_SCHEMA_VALIDATE_MESSAGES = {
  EMAIL: 'не является email',
  PASSWORD: 'Внесённый пароль не является надёжным',
  NAME: 'не соответсвует диапазону длины строки - от 2 до 30 символов',
};

const MOVIE_SCHEMA_REQUIRED_MESSAGES = {
  COUNTRY: 'Поле-строка "country - страна" является обязательным',
  DIRECTOR: 'Поле-строка "director - режиссёр" является обязательным',
  DURATION: 'Поле-число "duration - хронометраж" является обязательным',
  YEAR: 'Поле-строка "year - год" является обязательным',
  DESCRIPTION: 'Поле-строка "description - описание" является обязательным',
  NAME_RU: 'Поле-строка "nameRU - название фильма на русском языке" является обязательным',
  NAME_EN: 'Поле-строка "nameEN - название фильма на английском языке" является обязательным',
  IMAGE: 'Поле-строка "image - ссылка на постер к фильму" является обязательным',
  TRAILER: 'Поле-строка "trailer - ссылка на трейлер фильма" является обязательным',
  THUMBNAIL: 'Поле-строка "thumbnail - миниатюрное изображение постера к фильму" является обязательным',
  OWNER: 'Поле-строка "owner - _id пользователя, который сохранил статью" является обязательным',
  MOVIE_ID: 'Поле-число "movieId - id фильма, который содержится в ответе сервиса MoviesExplorer" является обязательным',
};
const MOVIE_SCHEMA_VALIDATE_MESSAGES = {
  IMAGE: 'не является URL адресом для постера к фильму',
  TRAILER: 'не является URL адресом для трейлера к фильму',
  THUMBNAIL: 'не является URL адресом для миниатюрного изображения постера к фильму',
};

module.exports = {
  BAD_URL,
  USER_SCHEMA_REQUIRED_MESSAGES,
  USER_SCHEMA_VALIDATE_MESSAGES,
  MOVIE_SCHEMA_REQUIRED_MESSAGES,
  MOVIE_SCHEMA_VALIDATE_MESSAGES,
};
