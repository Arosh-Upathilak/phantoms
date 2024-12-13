const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imahe: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Project', projectSchema);
