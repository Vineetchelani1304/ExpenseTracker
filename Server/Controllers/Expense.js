const Expenses = require('../Models/Expense.Model');
const User = require('../Models/User.Model');
const History = require('../Models/History.Model');
exports.createExpense = async (req, res) => {
    try {
        const userId = req.user.id; // Ensure req.user.id is correctly retrieved
        console.log("userId", userId);
        
        const { expenseHeading, descriptions } = req.body;

        if (!expenseHeading || !descriptions) {
            return res.status(403).json({
                success: false,
                message: 'All details are required'
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User not found"
            });
        }

        const newExpense = await Expenses.create({
            expenseHeading: expenseHeading,
            descriptions: descriptions
        });

        await User.findByIdAndUpdate(
            userId,
            {
                $push: { expenses: newExpense._id }
            },
            { new: true }
        );

        console.log("New Expense: ", newExpense);

        res.status(200).json({
            success: true,
            data: newExpense,
            message: "Expense created successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating the expense"
        });
    }
};



exports.SettleExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const { expenseId } = req.body;
        console.log("Settle Expense: ", expenseId);
        if (!expenseId) {
            return res.status(402).json({
                success: false,
                message: "No expense provided"
            });
        }

        const settleExpense = await Expenses.findById(expenseId);
        if (!settleExpense) {
            return res.status(403).json({
                success: false,
                message: "No such expense"
            });
        }

        // Add expense into history
        const history = await History.create({ expense: settleExpense });
        const populatedHistory = await History.findById(history._id).populate('expense');
        console.log("History created: ", populatedHistory);

        const deletedExpense = await Expenses.findByIdAndDelete(expenseId);
        if (deletedExpense) {
            return res.status(200).json({
                success: true,
                message: "Expense settled successfully"
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to settle the expense"
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while settling the expense"
        });
    }
};