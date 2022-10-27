const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const movieRouter = require('./movieRoutes');
const {NotFoundError} = require("../errors/NotFoundError");
const { createUser, login } = require('../controllers/users');
const auth = require("../middlewares/auth");
const {validateLogin, validateSignup} = require("../middlewares/requestValidation");

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateLogin, login);
router.use('/users', auth, usersRoutes);
router.use('/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;