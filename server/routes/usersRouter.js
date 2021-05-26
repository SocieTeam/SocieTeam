const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const auth = require('../middlewares/jwtAuth')

// GET: /users/:id (get user)
router.get('/:id', auth, userController.getUser);

// GET : /users/:id/events
router.get('/:id/events', userController.getUserEvents);

// GET: /users/:id/reservations
router.get('/:id/reservations', auth, userController.getUserReservations);

// POST: /users/newUser
router.post('/newUser', userController.createUser);

// POST: /users/login | login route
router.post('/login', userController.login);

// PATCH: /users/:id (updateUser)
router.patch('/:id', auth, userController.updateUser);

// GET: /users/:id/feed
router.get('/:id/feed', userController.getFeed)

module.exports = router;