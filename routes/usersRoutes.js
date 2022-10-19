const {getCurrentUser, createUser, UpdateCurrentUser} = require("../controllers/users");
const usersRoutes = require('express').Router();

usersRoutes.get('/me', getCurrentUser)
usersRoutes.patch('/me', UpdateCurrentUser)
usersRoutes.patch('/', createUser)

module.exports = usersRoutes;