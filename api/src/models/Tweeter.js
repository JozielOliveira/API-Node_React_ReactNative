const mongoose = require('mongoose')

const TweeteSchema = new mongoose.Schema({
    author: String,
    conten: String,
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}) 

module.exports = mongoose.model("Tweet", TweeteSchema)