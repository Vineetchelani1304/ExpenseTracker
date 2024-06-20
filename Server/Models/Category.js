const mongoose = require('mongoose');
const Category = new mongoose.Schema({
    description:{
        type: 'string',
        required:true,
        trim:true,
    },
    share:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Share"
    },
    Personal:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Personal"
    }
},{
    timestamps:true
})



module.exports = mongoose.model('Category',Category);