const mongoose = require('mongoose');
const Personal = new mongoose.Schema({
    itemsBought:[{
        type: 'string',
        required: true
    }],
    totalCost:{
        type: 'string',
        required: true,
    },
},{
    timestamps:true
})

module.exports = mongoose.model('Personal', Personal)