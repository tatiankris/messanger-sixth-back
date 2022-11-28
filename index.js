const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/authRouter')
const messagesRouter = require('./routes/messagesRouter')
const PORT = process.env.PORT || 5000
const corsMiddleware = require('./middleware/cors.middleware')

const app = express()
const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE']
}

app.use(cors(corsOptions))
app.use(corsMiddleware)
app.use(express.json())
app.use('/auth', authRouter)
app.use('/messages', messagesRouter)

const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://qwer123:qwer123@cluster0.fcndlgp.mongodb.net/task6?retryWrites=true&w=majority")
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start();
module.exports = app;