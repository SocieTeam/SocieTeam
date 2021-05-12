const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

// GET: /user/:id (get user)
router.get('/users/:id', userController.getUser);

// GET : /user/:id/events
router.get('/users/:id/events', userController.getUsersEvents);

// GET: /user/:id/reservations
router.get('/users/:id/reservations', userController.getUsersReservations);

// POST: /newUser
router.post('/newUsers', userController.createUser);

// PATCH: /user/:id (updateUser)
router.put('/users/:id', userController.updateUser);

module.exports = router;