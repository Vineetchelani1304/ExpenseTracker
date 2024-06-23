const History = require('../Models/History.Model');
const User = require('../Models/User.Model');
const Expenses = require('../Models/Expense.Model');

exports.deleteHistory = async (req,res) => {
    try {
        const user = req.user.id;
        const {expenseId} = req.body;
        if(!expenseId){
            return res.status(403).json({
                success: false,
                message:"expense id required"
            })
        }

        const expense = await Expenses.findById(expenseId);
        if(expense){
            return res.status(400).json({
                success: false,
                message:"expense is not deleted yet"
            })
        }

        const deleteHistory = await History.findByIdAndDelete(expenseId);
        return res.status(204).json({
            success: true,
            message:"expense deleted from history"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:"something went wrong while deleting"
        })
    }
}