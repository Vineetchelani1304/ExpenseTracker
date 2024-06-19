const mongoose = require('mongoose');
const Expense = new mongoose.Schema({
    expenseHeading:{
        type: 'string',
        required: true,
    },
    category:{
        type:'string',
        enum:["Personal","Sharing"]
    },
    totalExpense:{
        type:'string',
        required:true,
    },
    descriptions:{
        type:'string',
        trim:true,
    },
},{
    timestamps:true,
});

module.exports = mongoose.model("Expense",Expense)