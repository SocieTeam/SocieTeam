const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET: /user/:id (get user)
router.get('/user/:id', userController.getUser);

// GET : /user/:id/events
router.get('/user/:id/events', userController.getUserEvents);

// GET: /user/:id/reservations
router.get('/user/:id/reservations', userController.getUserReservations);

// POST: /newUser
router.post('/newUser', userController.createUser);

// PATCH: /user/:id (updateUser)
router.put('/user/:id', userController.updateUser);

module.exports = router;