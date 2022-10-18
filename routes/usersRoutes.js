const {getCurrentUser, createUser} = require("../controllers/users");
const usersRoutes = require('express').Router();

usersRoutes.get('/me', getCurrentUser)
usersRoutes.patch('/', createUser)

module.exports = usersRoutes;