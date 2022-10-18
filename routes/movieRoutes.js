const {createMovies, getMoivesListCurrentUser, deleteMovies} = require("../controllers/movies");

const movieRouter = require('express').Router();

movieRouter.get('/', getMoivesListCurrentUser)
movieRouter.post('/', createMovies)
movieRouter.delete('/:movieId', deleteMovies)


module.exports = movieRouter;