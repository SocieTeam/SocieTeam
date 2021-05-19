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
router.get('/:id', eventsController.getEvent);

//GET /events
router.get('/', eventsController.getEvents);

module.exports = router;