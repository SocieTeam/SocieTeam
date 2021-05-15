const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

// GET: /user/:id (get user)
router.get('/:id', userController.getUser);

// GET : /user/:id/events
router.get('/:id/events', userController.getUsersEvents);

// GET: /user/:id/reservations
router.get('/:id/reservations', userController.getUsersReservations);

// POST: /newUser
router.post('/newUser', userController.createUser);

// POST: users/login | login route
router.post('/login', userController.login)

// PATCH: /user/:id (updateUser)
router.put('/:id', userController.updateUser);

module.exports = router;