const Share = require('../Models/Share.Model');
const Expense = require('../Models/Expense.Model');
const { SettleExpense } = require('./Expense');

exports.createShare = async (req, res) => {
    try {
        const { 
            expenseId,
            itemsBought,
            itemsCount, 
            totalCost, 
            whoPaid, 
            paymentDone, 
            shareCount,
            // photos 
        } = req.body;

        // Check if all required fields are provided
        if (!itemsBought || !itemsCount || !totalCost || !whoPaid || !paymentDone || !shareCount) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        // Calculate perHead
        const perHead = itemsCount / shareCount;

        // Create new share record
        const newShare = await Share.create({
            itemsBought,
            itemsCount, 
            totalCost, 
            perHead, 
            whoPaid, 
            paymentDone, 
            shareCount,
            // photos 
        });
        console.log("newShare",newShare)

        // Update Expense document to add new share
        // console.log("expense Id",expenseId)
        // const expenseDetails = await Expense.findById(expenseId);
        // expenseDetails.share = newShare;
        const updateExpense = await Expense.findByIdAndUpdate(
            expenseId,
            { share : newShare },
            { new: true }
        ).populate("share"); // Populate the 'share' field in the Expense model
        console.log(updateExpense);
        return res.status(201).json({
            success: true,
            data: updateExpense,
            message: "Share created successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the share"
        });
    }
};

