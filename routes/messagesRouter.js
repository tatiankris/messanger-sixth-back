const Router = require('express')
const router = new Router()
const controller = require('../controllers/messagesController')
const {check} = require("express-validator")
// const authMiddleware = require('../middleware/auth.middleware')

router.post('/send',
    // [
    //     check('recipient', "Recipient is required!").notEmpty(),
    //     check('title', "Title is required!").notEmpty(),
    //     check('message', "Message is required!").notEmpty(),
    // ],
    controller.send)

// router.get('/me', authMiddleware, controller.authMe)

router.post('/in', controller.getInMessages)
router.post('/out', controller.getOutMessages)

module.exports = router
