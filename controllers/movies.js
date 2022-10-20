const Movie = require('../models/movie');
const { ValidationError } = require('../errors/ValidationError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

const getMoivesListCurrentUser = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => {
      res.status(201).send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Ошибка валидации, проверьте поля для заполнения'));
      } else next(err);
    });
};

const deleteMovies = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм по с таким ID не существует');
      }
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError('Вы не можете удалить данный фильм');
      } else {
        Movie.findByIdAndDelete(movieId)
          .then((deletedMovie) => {
            res.status(200).send({ data: deletedMovie });
          })
          .catch(next);
      }
    })
    .catch(next);
};
module.exports = {
  createMovies,
  deleteMovies,
  getMoivesListCurrentUser,
};
