const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

//POST /events/new

router.post('/new', eventsController.createEvent);

//Post /events/:id/reserve

router.post('/:id/reserve', eventsController.reserveEvent);

//DELETE /events/:id

router.delete('/:id', eventsController.deleteEvent);

//GET /events/:id

router.get('/:id', eventsController.getEvent);

module.exports = router;