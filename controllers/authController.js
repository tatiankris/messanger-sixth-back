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

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Empty error"})
            }

            const {username} = req.body

            const user = await User.findOne({username})

            if (!user) {
                const newUser = new User({username, inMessage: [], outMessage: []})
                console.log('LOGIN!!!!!!!!', newUser)
                await newUser.save()

                const resUser = await User.findOne({username})
                const token = generateAccessToken(resUser._id)
                const id = resUser._id
                return res.json({token, username, id, resUser})
            }
            const resUser = await User.findOne({username})
                const token = generateAccessToken(resUser._id)
                const id = resUser._id
                return res.json({token, username, id, resUser})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            const usernames = users.map(u => u.username)
            res.json(usernames)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Users error"})
        }

    }

}
module.exports = new authController()