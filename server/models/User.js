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
    static getUserEvents(id){
        const queryText = 'SELECT * FROM Events WHERE user_id = $1;';
        return db.query(queryText, [id]).then(results => results.rows);
    }
    static getUserReservations(id){
        const queryText = 'SELECT title, username, location, time_start, time_end, isvirtual, image, Events.id FROM Events JOIN Reservations ON Reservations.event_id = Events.id JOIN Users ON Users.id = Events.user_id WHERE Reservations.user_id = $1';
        return db.query(queryText, [id]).then(results => results.rows);
    }
    static createUser(user){
        const {email, username, password} = user;
        const queryText = 'INSERT INTO Users (email, username, password, zip) VALUES ($1, $2, $3, $4) RETURNING *;';
        return db.query(queryText, [email, username, password, '10036']).then(results => results.rows[0]);
    }
    static updateUser (id, updatedUser){
        let zip = updatedUser.zip === '' ? '10036' : updatedUser.zip
        const queryText = 'UPDATE Users SET email = $1, username = $2, zip = $3, profile_pic = $4 WHERE id = $5;';
        const query = 'SELECT * FROM Users WHERE id = $1;';
        db.query(queryText,[updatedUser.email, updatedUser.username, zip, updatedUser.profile_pic, id]);
        return db.query(query,[id]).then(results => results.rows[0]);
      }
    static getFeed(user_id, zipList) {
        const queryText = 'SELECT * FROM Events WHERE NOT user_id = $1 AND zip = ANY ($2)'
        return db.query(queryText, [user_id, zipList]).then(results => results.rows)
    }
    static resetPass(user_id, password) {
        const queryText = 'UPDATE Users SET password = $1 WHERE id = $2 returning *'
        return db.query(queryText, [password, user_id]).then(results => results.rows[0])
    }
}
module.exports = {User};