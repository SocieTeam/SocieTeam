const {Event} = require('../models/Event');


const createEvent = async (req, res) => {
    const eventForm = req.body
    const user_id = eventForm.userId
    try{
        let newEvent = await Event.createEvent(eventForm, user_id);
        if (newEvent) {
            res.status(200).json(newEvent);
        }
        else {
            throw new Error('Something went worng');
        }
    } catch(err) {
        res.status(500).send(err);
    }
}

const getEvent = async(req, res) => {
    const event_id = req.params.id;

    try{
        let event = await Event.getEvent(event_id);
        res.status(200).json(event);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const getEvents = async (req, res) => {
    try {
        let events = await Event.getEvents();
        res.json(events);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const reserveEvent = async (req, res) => {
    let event_id = req.params.id;
    const user_id  = req.userId
    const event = await Event.getEvent(event_id)
    try {
        if (user_id && event) {
            const isReserved = await Event.isReserved(event_id, user_id);
            if (isReserved) {
                const unreserve = await Event.unreserve(event_id, user_id);
                res.json(unreserve);
            }
            else {
                const reserve = await Event.reserveEvent(event_id, user_id);
                res.json(reserve);
            }
        }
        else {
            throw new Error ('Event not found');
        }
    } catch (err){
        res.status(500).send(err.message);
    }
}

const deleteEvent = async (req, res) => {
    const event_id = req.params.id;
    const user_id = '1'; //Temporary until session cookie is available
    const event = await Event.getEvent(event_id);

    try {
        if(user_id == event.user_id) {
            const removed = await Event.deleteEvent(event_id);
            res.json(removed);
        }
        else {
            throw new Error ('users do not match');
        }
    }
    catch (err){
        res.status(500).send(err.message)
    }
}

const editEvent = async (req, res) => {
    const event_id = req.params.id;
    try {
        let event = await Event.getEvent(event_id);
        event = Object.assign(event, req.body)
        if (req.userId === event.user_id) {
            const updatedEvent = await Event.updateEvent(event, event_id);
            res.status(200).json(updatedEvent)
        }
        else {
            throw new Error ('users do not match')
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

module.exports = {
    createEvent,
    reserveEvent,
    deleteEvent,
    getEvent,
    getEvents,
    editEvent
}