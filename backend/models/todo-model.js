const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    todoName: { type: String, required: true },
    date: { type: Date, required: true },
    label: { type: String, required: true },
    creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
})

module.exports = mongoose.model('Todo', todoSchema);