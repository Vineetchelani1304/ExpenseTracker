import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ExpenseDetails = () => {
    const { expenseId } = useParams();
    const [expenseDetails, setExpenseDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpenseDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('You must be logged in to view expense details');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:4000/expenses/${expenseId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.success) {
                    setExpenseDetails(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('An error occurred while fetching the expense details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchExpenseDetails();
    }, [expenseId]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
    }

    if (!expenseDetails) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200">
            <div className="bg-slate-800 p-8 rounded-lg shadow-xl    shadow-slate-900 w-fit max-w-4xl text-slate-200">
                <h2 className="text-3xl font-bold mb-6 text-center">Expense Details</h2>
                <h3 className="text-2xl text-slate-300 font-semibold mb-2">{expenseDetails.expenseHeading}</h3>
                <p className=" mb-2 text-xl text-slate-200 ">{expenseDetails.descriptions}</p>
                {/* <p className="text-gray-700 mb-2">Total Cost: ${expenseDetails.totalCost}</p> */}

                {expenseDetails.share ? (
                    <div>
                        <p className="text-blue-500">Shared Expense</p>
                        <p className=' text-slate-700 bg-slate-200 rounded-md p-1 mt-4'>Items Bought: {expenseDetails.share.itemsBought.join(', ')}</p>
                        <p className=' text-slate-700 bg-slate-200 rounded-md p-1 mt-4'>Items Count: {expenseDetails.share.itemsCount}</p>
                        <p className=' text-slate-700 bg-slate-200 rounded-md p-1 mt-4'>Total Cost: ${expenseDetails.share.totalCost}</p>
                        <p className=' text-slate-700 bg-slate-200 rounded-md p-1 mt-4'>Per Head Cost: ${expenseDetails.share.perHead}</p>
                        <p className=' text-slate-700 bg-slate-200 rounded-md p-1 mt-4'>Who Paid: {expenseDetails.share.whoPaid}</p>
                        <p className=' text-slate-700 bg-slate-200 rounded-md p-1 mt-4'>Payment Done: {expenseDetails.share.paymentDone ? 'Yes' : 'No'}</p>
                        <p className=' text-slate-700 bg-slate-200 rounded-md p-1 mt-4'>Share Count Emails: {expenseDetails.share.shareCountEmail.join(', ')}</p>
                        <p className=' text-slate-700 bg-slate-200 rounded-md p-1 mt-4'>Photos: {expenseDetails.share.photos}</p>
                    </div>
                ) : (
                    <div>
                        <p className="text-green-500">Personal Expense</p>
                        <p className=' bg-slate-300 p-1 rounded-md text-slate-700 mt-4'>Items Bought: {expenseDetails.personal.itemsBought.join(', ')}</p>
                        <p className=' bg-slate-300 p-1 rounded-md text-slate-700 mt-4'>Items Count: {expenseDetails.personal.itemsCount}</p>
                        <p className=' bg-slate-300 p-1 rounded-md text-slate-700 mt-4'>Total Cost: ${expenseDetails.personal.totalCost}</p>
                        <p className=' bg-slate-300 p-1 rounded-md text-slate-700 mt-4'>Photos: {expenseDetails.personal.photos}</p>
                    </div>
                )}

                <button
                    onClick={() => navigate('/')}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Back to Expenses
                </button>
            </div>
        </div>
    );
};

export default ExpenseDetails;
