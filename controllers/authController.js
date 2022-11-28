const User = require('../models/User')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {

    async login(req, res) {
        try {

            // const errors = validationResult(req)
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({message: "Empty error"})
            // }

            const {username} = req.body

            const user = await User.findOne({username})

            if (!user) {
                const newUser = new User({username, inMessage: [], outMessage: []})
                console.log('LOGIN!!!!!!!!', newUser)
                await newUser.save()

                const token = generateAccessToken(newUser._id)
                const id = newUser._id
                return res.json({token, username, id})
            }

                const token = generateAccessToken(user._id)
                const id = user._id
                return res.json({token, username, id, user})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Users error"})
        }

    }

    // async authMe (req, res) {
    //     try {
    //         const user = await User.findOne({_id: req.user.id})
    //         const token = jwt.sign({id: user._id}, secret, {expiresIn: "1h"})
    //         const email = user.email
    //         const id = user._id
    //         const status = user.status
    //
    //         return res.json({token, email, id, status})
    //     } catch (e) {
    //         console.log(e)
    //         return res.status(400).json({message: "Auth error"})
    //     }
    // }
}
module.exports = new authController()