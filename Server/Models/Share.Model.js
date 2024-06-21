const mongoose = require('mongoose');

const Share = new mongoose.Schema({
    itemsBought: [{
        type: String,
        required: true
    }],
    itemsCount: {
        type: Number,
        required: true
    },
    totalCost: {
        type: String,
        required: true,
    },
    perHead: {
        type: String,
        required: true
    },
    whoPaid: {
        type: String,
        required: true
    },
    paymentDone: {
        type: Boolean,
        required: true
    },
    shareCount: [{
        type: String,  // Define as String, not 'string'
        required: true
    }],
    photos: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Share", Share);
