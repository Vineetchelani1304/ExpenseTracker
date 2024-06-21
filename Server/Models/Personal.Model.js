const mongoose = require('mongoose');
const Personal = new mongoose.Schema({
    itemsBought:[{
        type: 'string',
        required: true
    }],
    itemsCount:{
        type: 'integer',
        required: true
    },
    totalCost:{
        type: 'string',
        required: true,
    },
    photos:{
        type: 'string',
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Personal', Personal)