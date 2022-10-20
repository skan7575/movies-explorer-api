const movieRouter = require('express').Router();
const { createMovies, getMoivesListCurrentUser, deleteMovies } = require('../controllers/movies');

movieRouter.get('/', getMoivesListCurrentUser);
movieRouter.post('/', createMovies);
movieRouter.delete('/:movieId', deleteMovies);

module.exports = movieRouter;
