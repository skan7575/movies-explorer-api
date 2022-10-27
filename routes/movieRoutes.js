const movieRouter = require('express').Router();
const { createMovies, getMoivesListCurrentUser, deleteMovies } = require('../controllers/movies');
const { validateDeleteMovie, validateCreateMovie } = require('../middlewares/requestValidation');

movieRouter.get('/', getMoivesListCurrentUser);
movieRouter.post('/', validateCreateMovie, createMovies);
movieRouter.delete('/:movieId', validateDeleteMovie, deleteMovies);

module.exports = movieRouter;
