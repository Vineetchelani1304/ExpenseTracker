const mongoose = require('mongoose');
const Expenses = new mongoose.Schema({
    expenseHeading:{
        type: 'string',
        required: true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },  
    tags:{
        type:'string',
        enum:["sharing","personal","business"],
    },
    totalExpense:{
        type:'string',
        required:true,
    },
    // descriptions:{
    //     type:'string',
    //     trim:true,
    // },
},{
    timestamps:true,
});

module.exports = mongoose.model("Expenses",Expenses)