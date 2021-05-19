const db = require("../db/config");

class Event {
    static createEvent(event, user_id) {
        const {title, location, time_start, time_end, isVirtual} = event;
        const queryText = 'INSERT INTO Events (title, user_id, location, time_start, time_end, isVirtual) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
        
        return db.query(queryText, [title, user_id, location, time_start, time_end, isVirtual]).then(results => results.rows[0]);
    }

    static getEvent(event_id) {
        const queryText = 'SELECT * FROM Events WHERE id = $1';

        return db.query(queryText, [event_id]).then(results => results.rows[0]);
    }

    static isReserved(event_id, user_id) {
        const queryText = 'SELECT * FROM Reservations WHERE event_id = $1 AND user_id = $2'

        return db.query(queryText, [event_id, user_id]).then(results => results.rows[0]);
    }

    static reserveEvent(event_id, user_id) {
        const queryText = 'INSERT INTO Reservations (event_id, user_id) VALUES ($1, $2) RETURNING *';

        return db.query(queryText, [event_id, user_id]).then(results => results.rows[0]);
    }

    static unreserve(event_id, user_id) {
        const queryText = 'DELETE FROM Reservations WHERE event_id = $1 AND user_id = $2 RETURNING *';

        return db.query(queryText, [event_id, user_id]).then(results => results.rows[0]);
    }

    static deleteEvent(event_id) {
        const queryText = 'DELETE FROM Events WHERE id = $1';

        db.query(queryText, [event_id]).then(results => results.rows);
    }

    static updateEvent(event, event_id) {

        const title = event.title;
        const location = event.location;
        const time_start = event.time_start;
        const time_end = event.time_end;
        const isVirtual = event.isVirtual;

        const queryText = 'UPDATE Events SET title = $1, location = $2, time_start = $3, time_end = $4, isvirtual = $5 WHERE id = $6';

        db.query(queryText, [title, location, time_start, time_end, isVirtual, event_id]);
        return db.query('SELECT * FROM Events WHERE id = $1', [event_id]).then(results => results.rows[0]);
    }

    static getEvent(event_id) {
        const queryText = 'SELECT * FROM Events WHERE id = $1';

        return db.query(queryText, [event_id]).then(results => results.rows[0]);
    }

    static getEvents() {
        return db.query('SELECT * FROM Events').then(results => results.rows);
    }
}

module.exports = {Event};