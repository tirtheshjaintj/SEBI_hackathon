const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const ChatModel = mongoose.model('Chat', chatSchema);
module.exports = ChatModel;
