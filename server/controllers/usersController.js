const { User } = require('../models/User');
const bcrypt = require('bcrypt')

// Creates custom errors that can be thrown, but also have details that can help later.
// NOTE: the [type] property codes are being documented in the README.md at the root of the server directory.
function CustomError (description, responseCode, type) {
    this.description = description
    this.responseCode = responseCode
    this.type = type
}
CustomError = CustomError.bind(new Error())

// An efficent way to check if a user exists by both username or email
async function checkExistingUser (username, email) {
   
}

// DRYs up the catch blocks
function errorHandler (res, error) {
    if (error instanceof CustomError) {
        res.status(error.responseCode).send(error)
    } else if (error instanceof Error){
        res.status(500).send(error.message)
    } else {
        res.status(500).send(error)
    }
}

// Gets a user by id
const getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        let user = await User.getUser(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            throw new CustomError(`user id:${userId} not found`, 404, 3)
        }
    } catch (err) {
        errorHandler(res, err)
    }
}

// Gets events for a user by their user id 
const getUsersEvents = async (req, res) => {
    const userId = req.params.id;
    try {
        let user = await User.getUser(userId);
        let event = await User.getUsersEvent(userId);
        user.event = event;
        res.status(200).json(user);
    } catch (err) {
        errorHandler(res, err)
    }
}

// Gets reservations for a user by their user id 
const getUsersReservations  = async (req, res) => {
    const userId = req.params.id;
    try {
        let user = await User.getUser(userId);
        let reservations = await User.getUserReservations(userId);
        user.reservations = reservations;
        res.status(200).json(user);
    } catch (err) {
        errorHandler(res, err)
    }
}

// Adds a new user
const createUser = async (req, res) => {
    const user = req.body;
    try {
        const emailExists = await User.findUserByEmail(email)
        if (emailExists) throw new CustomError(`${email} already exists`, 400, 1)

        const usernameExists = await User.findUserByUsername(username)
        if (usernameExists) throw new CustomError(`${username} already exists`, 400, 2)

        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash
        const userInfo = await User.createUser(user);
        res.status(200).json(userInfo);
    } catch (err) {
        errorHandler(res, err)
    }
}

// updateUser
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updatedUser = Object.assign(req.user, req.body);
    try {
        const user = await User.updateUser(userId, updatedUser);
        res.status(200).json(user);
    } catch (err) {
        errorHandler(res, err)
    }
}

const login = async (req, res) => {
    const credentials = req.body
    try {
        const emailExists = await User.findUserByEmail(credentials.identity)
        const usernameExists = await User.findUserByUsername(credentials.identity)
        if (!(emailExists || usernameExists)) {
            throw new CustomError('Invalid credentials', 401, 4)
        } else {
            const identity = emailExists || usernameExists
            const successfulAuth = await bcrypt.compare(credentials.password, identity.password)
            if (successfulAuth) {
                res.status(200).send('Yay!')
            } else {
                throw new CustomError('Invalid credentials', 401, 4)
            }
        }
    } catch (err) {
        errorHandler(res, err)
    }

}

module.exports = {
    getUser,
    getUsersEvents,
    getUsersReservations,
    createUser,
    updateUser,
    login
};