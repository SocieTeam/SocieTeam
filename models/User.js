const db = require("../db/config");

class User{
    static getUser(id){
        const queryText = 'SELECT * FROM Users WHERE id = $1;';
        return db.query(queryText, [id]).then(results => results.rows[0]);
    }
    static getUserEvent(id){
        const queryText = 'SELECT * FROM Events WHERE user_id = $1;';
        return db.query(queryText, [id]).then(results => results.rows);
    }
    static getUserReservations(id, eventID){
        const queryText = 'SELECT user_id, event_id FROM Reservations WHERE user_id = $1 AND WHERE event_id = $2;';
        return db.query(queryText, [id,eventID]).then(results => results.rows);
    }
    static createUser(user, id){
        const {email, username, password} = user;
        const queryText = 'INSERT INTO Users (email, username, password) VALUES ($1, $2, $3) RETURNING *;';
        return db.query(queryText, [email, username, password, id]).then(results => results.rows[0]);
    }
    static updateUser (id, updateUser){
        const queryText = 'UPDATE Users SET email = $1, username = $2, password = $3 WHERE id = $4;';
        const query = 'SELECT * FROM Users WHERE id = $1;';
        db.query(queryText,[updateUser.email, updateUser.username, updateUser.password, id]);
        return db.query(query,[id]).then(results => results.rows[0]);
      }
}
module.exports = {User};