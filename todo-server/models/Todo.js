const mongoose = require('mongoose');

// Создание схемы задачи
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);