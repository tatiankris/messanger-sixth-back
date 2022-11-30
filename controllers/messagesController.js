const {validationResult} = require('express-validator')
const User = require('../models/User')
const Message = require('../models/Message')

class messagesController {

    async send(req, res) {
        try {

            // const errors = validationResult(req)
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({message: "Empty error"})
            // }

            const {sender, recipient, title, message} = req.body

            const userSender = await User.findOne({username: sender})
            if (!userSender) {
                return res.status(400).json({message: "Send error!"})
            }
            const userRecipient = await User.findOne({username: recipient})
            if (!userRecipient) {
                return res.status(400).json({message: "Recipient is not found!"})
            }

            const newMessage = new Message({sender, recipient, title, message, date: new Date()})

            await User.updateOne({username: sender}, {outMessage: [newMessage, ...userSender.outMessage]})
            await User.updateOne({username: recipient}, {inMessage: [newMessage, ...userRecipient.inMessage]})
            // console.log('outMessages', userSender.outMessage)

            return res.json({newMessage, status: "Message sent successfully!"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Message sent successfully!"})
        }
    }

    async getInMessages(req, res) {
        try {
           const {username} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: "User is not found!"})
            }

            res.json({inMessage: user.inMessage})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Get incoming messages error"})
        }
    }

    async getOutMessages(req, res) {
        try {
           const {username} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: "User is not found!"})
            }

            res.json({outMessage: user.outMessage})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Get outgoing messages error"})
        }
    }
}

module.exports = new messagesController()