const mongoose = require('mongoose');
const Share = new mongoose.Schema({
    itemsBought:[{
        type: 'string',
        required: true
    }],
    totalCost:{
        type: 'string',
        required: true,
    },
    perHead:{
        type: 'string',
        required: true
    },
    shareCount:[{
        type: 'string',
        required: true
    }]
},{
    timestamps:true
})

module.exports = mongoose.model('Share', Share)