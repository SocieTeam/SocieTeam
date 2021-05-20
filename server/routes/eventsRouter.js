const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const auth = require('../middlewares/jwtAuth')

//POST /events/new
router.post('/new', eventsController.createEvent);

//POST /events/:id/reserve
router.post('/:id/reserve', auth, eventsController.reserveEvent);

//DELETE /events/:id
router.delete('/:id', auth, eventsController.deleteEvent);

//GET /events/:id
router.get('/:id', auth, eventsController.getEvent);

//GET /events
router.get('/', eventsController.getEvents);

// PATCH /events/:id
router.patch('/:id', auth, eventsController.editEvent);


module.exports = router;