const {Schema, model} = require('mongoose')

const Message = new Schema({ name: String,
    sender: {type: String, required: true},
    recipient: {type: String, required: true},
    title: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, required: true},
});

module.exports = model('Message', Message)