const { User } = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { CustomError, errorHandler } = require('../middlewares/errors')
const fetch = require('node-fetch')

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
const getUserEvents = async (req, res) => {
    const userId = req.params.id;
    try {
        await User.getUser(userId);
        let events = await User.getUserEvents(userId);
        res.status(200).json({userId, events});
    } catch (err) {
        errorHandler(res, err)
    }
}

// Gets reservations for a user by their user id 
const getUserReservations  = async (req, res) => {
    const userId = req.params.id;
    try {
        await User.getUser(userId);
        let reservations = await User.getUserReservations(userId);
        res.status(200).json({userId, reservations});
    } catch (err) {
        errorHandler(res, err)
    }
}

// Adds a new user
const createUser = async (req, res) => {
    const user = req.body;
    try {
        const emailExists = await User.findUserByEmail(user.email)
        if (emailExists) throw new CustomError(`${user.email} already exists`, 400, 1)

        const usernameExists = await User.findUserByUsername(user.username)
        if (usernameExists) throw new CustomError(`${user.username} already exists`, 400, 2)

        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash
        const userInfo = await User.createUser(user);
        const token = jwt.sign({userId: userInfo.id}, process.env.JWT_KEY, {expiresIn: 60 * 30})
        res.status(200).json({
            user: userInfo,
            message: 'Account Creation Successful',
            token
        });
    } catch (err) {
        errorHandler(res, err)
    }
}

// updateUser
const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.getUser(userId);
        if (req.body.username) {
            const usernameExists = await User.findUserByUsername(req.body.username)
            if (usernameExists) throw new CustomError(`${user.username} already exists`, 400, 2)
        }
        const updatedUser = await User.updateUser(userId, Object.assign(user, req.body));
        res.status(200).json({message: 'User Updated Successfully', user: updatedUser });
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
                const token = jwt.sign({userId: identity.id}, process.env.JWT_KEY, {expiresIn: 60 * 30})
                res.status(200).json({
                    user: identity,
                    message: 'Login Successful',
                    token
                });
            } else {
                throw new CustomError('Invalid credentials', 401, 4)
            }
        }
    } catch (err) {
        errorHandler(res, err)
    }
}

const getFeed = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.getUser(userId)
        const zip = user.zip
        if (!zip) throw new CustomError('Invalid Zip', 401, 6)
        fetch(`${process.env.ZIPCODE_BASE_BASE_URL}/radius?apikey=${process.env.ZIPCODE_BASE_API_KEY}&code=${zip}&radius=10&unit=miles&country=us`)
        .then(res => res.json())
        .then(async (json) => {
            const zipList = json.results.map(zip => zip.code)
            const feed = await User.getFeed(userId, zipList)
            for (let i=0; i<feed.length; i++) {
                const user = await User.getUser(feed[i].user_id)
                feed[i].username = user.username
            }
            res.status(200).send(feed)
        })
    } catch (err) {
        errorHandler(res, err)
    }

}

module.exports = {
    getUser,
    getUserEvents,
    getUserReservations,
    createUser,
    updateUser,
    login,
    getFeed
};