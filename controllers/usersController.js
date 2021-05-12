const {User} = require('../models/User');

// get user in api 
const getUser = async (req, res) => {
    const userId = req.params.id;
    try{
        let user = await User.getUser(userId);
        if(user){
            res.status(200).json(user);
        } else {
            res.status(404).json({message: "user not found"});
        }
    } catch {
        res.status(500).send("error");
    }
}

// gets events for user by their user id api
const getUsersEvents = async (req, res) => {
    const userId = req.params.id;
    try {
        let user = await User.getUser(userId);
        let event = await User.getUserEvent(userId);
        user.event = event;
        res.status(200).json(user);
    } catch {
        res.status(500).send("error");
    }
}

// gets reservations for user by their user id api
const getUsersReservations  = async (req, res) => {
    const userId = req.params.id;
    try {
        let user = await User.getUser(userId);
        let reservations = await User.getUserReservations(userId);
        user.reservations = reservations;
        res.status(200).json(user);
    } catch {
        res.status(500).send("error");
    }
}

// adds a new user
const createUser = async (req, res) => {
    const user = req.body;
    let userId = req.params.id;
    try{
        const userInfo = await User.createUser(user, userId);
        res.status(200).json(userInfo);
    } catch {
        res.status(500).send("error");
    }
}

// updateUser
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updatedUser = Object.assign(req.user, req.body);
    try{
        const user = await User.updateUser(userId, updatedUser);
        res.status(200).json(user);
    } catch {
        res.status(500).send("error");
    }
}

module.exports = {
    getUser,
    getUsersEvents,
    getUsersReservations,
    createUser,
    updateUser
};