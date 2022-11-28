const {Schema, model} = require('mongoose')


const Message = new Schema({ name: String,
    sender: {type: String, required: true},
    recipient: {type: String, required: true},
    title: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, required: true},
});
// const Messages = new Schema({
//     inMessage: [Message],
//     outMessage: [Message],
// });
const User = new Schema({
    username: {type: String, unique: true, required: true},
    inMessage: {type: Array, required: true},
    outMessage: {type: Array, required: true}
})

module.exports = model('User', User)
