const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const {SignUpError} = require("../errors/SignUpError");
const {ValidationError} = require("../errors/ValidationError");
const {NotFoundError} = require("../errors/NotFoundError");
const { NODE_ENV, JWT_SECRET } = process.env;


const getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user => {
      if (!user) {
        throw NotFoundError('Пользователь по указанному _id не найден.');
      }
      return res.send(user)

    }))
    .catch((err) => {
      next(err)
    });
}
const createUser = (req, res, next) => {
  const {email, password, name} = req.body
  User.findOne({email})
    .then((user) => {
      if (user) {
        throw new SignUpError('Пользователь с данным email уже существует');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      email, password: hash, name
    }))
    .then((newUser) => res.send(
      {data: email, name},
    ))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Введены не некорректные данные'));
      } else {
        next(err)
      }
    });
}
const login = (req, res, next) => {
  const {email, password} = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: `${jwt.sign(
          {_id: user._id},
          (NODE_ENV === 'production' ? JWT_SECRET : 'PrivateKey'),
          {expiresIn: '7d'},
        )}`,
      });
    })
    .catch(next);
};

module.exports = {
  login,
  getCurrentUser,
  createUser
}