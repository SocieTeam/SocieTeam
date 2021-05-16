const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const auth = require('../middlewares/jwtAuth')

// GET: /users/:id (get user)
router.get('/:id', auth, userController.getUser);

// GET : /users/:id/events
router.get('/:id/events', userController.getUsersEvents);

// GET: /users/:id/reservations
router.get('/:id/reservations', userController.getUsersReservations);

// POST: /users/newUser
router.post('/newUser', userController.createUser);

// POST: /users/login | login route
router.post('/login', userController.login);

// PATCH: /users/:id (updateUser)
router.patch('/:id', auth, userController.updateUser);

module.exports = router;