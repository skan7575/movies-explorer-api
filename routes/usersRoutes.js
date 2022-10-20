const usersRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCurrentUser, UpdateCurrentUser } = require('../controllers/users');

usersRoutes.get('/me', getCurrentUser);
usersRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
}), UpdateCurrentUser);

module.exports = usersRoutes;
