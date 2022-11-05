const usersRoutes = require('express').Router();
const { getCurrentUser, UpdateCurrentUser } = require('../controllers/users');
const { validateUpdateCurrentUser } = require('../middlewares/requestValidation');

usersRoutes.get('/me', getCurrentUser);
usersRoutes.patch('/me', validateUpdateCurrentUser, UpdateCurrentUser);

module.exports = usersRoutes;
