const db = require("../db/config");

class User {
    static getUser(id){
        const queryText = 'SELECT * FROM Users WHERE id = $1;';
        return db.query(queryText, [id]).then(results => results.rows[0]);
    }
    static findUserByUsername(username) {
        const queryText = 'SELECT * FROM Users WHERE username = $1;'
        return db.query(queryText, [username]).then(results => results.rows[0]);
    }
    static findUserByEmail(email) {
        const queryText = 'SELECT * FROM Users WHERE email = $1;'
        return db.query(queryText, [email]).then(results => results.rows[0]);
    }
    static getUsersEvent(id){
        const queryText = 'SELECT * FROM Events WHERE user_id = $1;';
        return db.query(queryText, [id]).then(results => results.rows);
    }
    static getUsersReservations(id, eventID){
        const queryText = 'SELECT user_id, event_id FROM Reservations WHERE user_id = $1 AND WHERE event_id = $2;';
        return db.query(queryText, [id,eventID]).then(results => results.rows);
    }
    static createUser(user){
        const {email, username, password} = user;
        const queryText = 'INSERT INTO Users (email, username, password) VALUES ($1, $2, $3) RETURNING *;';
        return db.query(queryText, [email, username, password]).then(results => results.rows[0]);
    }
    static updateUser (id, updatedUser){
        const queryText = 'UPDATE Users SET email = $1, username = $2, password = $3, zip = $4 WHERE id = $5;';
        const query = 'SELECT * FROM Users WHERE id = $1;';
        db.query(queryText,[updatedUser.email, updatedUser.username, updatedUser.password, updatedUser.zip, id]);
        return db.query(query,[id]).then(results => results.rows[0]);
      }
}
module.exports = {User};