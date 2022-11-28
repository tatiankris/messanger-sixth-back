const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require("express-validator")
// const authMiddleware = require('../middleware/auth.middleware')

router.post('/login',
    // [
    //     check('username', "Username is required!").notEmpty()
    // ],
    controller.login)

router.get('/users', controller.getUsers)
// router.get('/me', authMiddleware, controller.authMe)

module.exports = router