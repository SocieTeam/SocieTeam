const { User } = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {CustomError, errorHandler} = require('../middlewares/errors')
const fetch = require("node-fetch");
const nodemailer = require('nodemailer');
const { request } = require('express');

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

        

       
        fetch(`https://app.zipcodebase.com/api/v1/radius?apikey=c0611fb0-b99c-11eb-838c-b79938c662b0&code=11220&radius=10&unit=miles&country=us`)
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

const sendEmail = async (req, res) => {
    let user = await User.findUserByEmail(req.params.email)
    if(user){
        let code = Math.floor(1000 + Math.random() * 9000)
        let transporter = nodemailer.createTransport({
        
        service: 'gmail',
        auth: {
            user: 'societeam21@gmail.com',
            pass: 'Goodpassword' // naturally, replace both with your real credentials or an application-specific password
        },
        tls: {
            rejectUnauthorized: false
        }
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"SocieTeam" <societeam21@gmail.com>', // sender address
        to: `${req.params.email}`, // list of receivers
        subject: "SocieTeam Password Reset", // Subject line
        text: "SocieTeam Password Reset", // plain text body
        html: `<p>This is the code <b>${code}</b></p>`, // html body
      });
    
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
    //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      
      const obj = {info: info.messageId, code: code}
      res.status(200).json(obj)
    }
    else {
        res.json(req.params.email)
    }
}

const resetPassword = async (req, res) => {
    const user_id = await User.findUserByEmail(req.body.email)
    let newPass = await bcrypt.hash(req.body.password, 10);
    const user = await User.resetPass(user_id.id, newPass)

    res.json(user);
}

module.exports = {
    getUser,
    getUserEvents,
    getUserReservations,
    createUser,
    updateUser,
    login,
    getFeed,
    sendEmail,
    resetPassword
};