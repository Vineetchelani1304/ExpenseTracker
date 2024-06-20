const Category = require('../Models/Category');
const Expenses = require('../Models/Expense.Model');
const User = require('../Models/User.Model');

exports.Expense = async (req, res) => {
    try {
        // expenseHeading:{
        //     type: 'string',
        //     required: true,
        // },
        // category:{
        //     type:'string',
        //     enum:["Personal","Sharing","Business"]
        // },
        // totalExpense:{
        //     type:'string',
        //     required:true,
        // },
        // descriptions:{
        //     type:'string',
        //     trim:true,
        // },
        const userId = req.user.id;
        const { expenseHeading, category } = req.body;
        if (!expenseHeading || !category) {
            return res.status(403).json({
                success: false,
                message: 'all details required'
            })
        }
        const user = await User.findById({ userId });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "user not found"
            })
        };

        const categoryDetails = await Category.findbyId(category);
        if (!categoryDetails) {
            return res.status(403).json({
                success: false,
                message: "not found category"
            })
        }

        const newExpense = await Expenses.create({
            expenseHeading: expenseHeading,
            category: category,
        })

        const userUpdate = await User.findByIdAndUpdate({
            _id: user._id
        }, {
            $push: {
                expenses: newExpense._id,
            },
        });

        await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    course: newCourse._id,
                },
            },
            { new: true }
        );
        console.log("new Expense :-",newExpense);

        res.status(200).json({
			success: true,
			data: newExpense,
			message: "expense Created Successfully",
		});

    } catch (error) {

    }
}