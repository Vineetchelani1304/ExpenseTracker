import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ExpenseDetails = () => {
    const { expenseId } = useParams();
    const [expenseDetails, setExpenseDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [settleLoading, setSettleLoading] = useState(false);
    const [settleError, setSettleError] = useState('');
    const [settleSuccess, setSettleSuccess] = useState('');
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

                const response = await axios.get(`https://expensetracker-rtqz.onrender.com/expenses/${expenseId}`, {
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


    const handleSettleExpense = async () => {
        setSettleError('');
        setSettleSuccess('');
        setSettleLoading(true);
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setSettleError('You must be logged in to settle an expense');
                setSettleLoading(false);
                return;
            }
    
            console.log('expenseId', expenseId);
    
            const response = await axios.post('https://expensetracker-rtqz.onrender.com/settleExpense', {
                expenseId,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("token", token)
    
            if (response.data.success) {
                setSettleSuccess('Expense settled successfully');
                navigate('/userExpenses');
            } else {
                setSettleError(response.data.message);
            }
        } catch (err) {
            setSettleError('An error occurred while settling the expense');
            console.error(err);
        } finally {
            setSettleLoading(false);
        }
    };
    
    
    
    

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-xl w-fit max-w-4xl text-black">
                <h2 className="text-3xl font-bold mb-6 text-center">Expense Details</h2>
                <h3 className="text-2xl text-slate-900 font-semibold mb-2">{expenseDetails.expenseHeading}</h3>
                <p className=" mb-2 text-xl text-slate-700 ">{expenseDetails.descriptions}</p>

                {expenseDetails.share ? (
                    <div>
                        <p className="text-blue-500">Shared Expense</p>
                        <p className=' text-slate-900 bg-slate-500 rounded-md p-1 mt-4'>Items Bought: {expenseDetails.share.itemsBought.join(', ')}</p>
                        <p className=' text-slate-900 bg-slate-500 rounded-md p-1 mt-4'>Items Count: {expenseDetails.share.itemsCount}</p>
                        <p className=' text-slate-900 bg-slate-500 rounded-md p-1 mt-4'>Total Cost: ${expenseDetails.share.totalCost}</p>
                        <p className=' text-slate-900 bg-slate-500 rounded-md p-1 mt-4'>Per Head Cost: ${expenseDetails.share.perHead}</p>
                        <p className=' text-slate-900 bg-slate-500 rounded-md p-1 mt-4'>Who Paid: {expenseDetails.share.whoPaid}</p>
                        <p className=' text-slate-900 bg-slate-500 rounded-md p-1 mt-4'>Payment Done: {expenseDetails.share.paymentDone ? 'Yes' : 'No'}</p>
                        <p className=' text-slate-900 bg-slate-500 rounded-md p-1 mt-4'>Share Count Emails: {expenseDetails.share.shareCountEmail.join(', ')}</p>
                        <p className=' text-slate-900 bg-slate-500 rounded-md p-1 mt-4'>Photos: {expenseDetails.share.photos}</p>
                    </div>
                ) : (
                    <div>
                        <p className="text-green-500">Personal Expense</p>
                        <p className=' bg-slate-500 p-1 rounded-md text-slate-900 mt-4'>Items Bought: {expenseDetails.personal.itemsBought.join(', ')}</p>
                        <p className=' bg-slate-500 p-1 rounded-md text-slate-900 mt-4'>Items Count: {expenseDetails.personal.itemsCount}</p>
                        <p className=' bg-slate-500 p-1 rounded-md text-slate-900 mt-4'>Total Cost: ${expenseDetails.personal.totalCost}</p>
                        <p className=' bg-slate-500 p-1 rounded-md text-slate-900 mt-4'>Photos: {expenseDetails.personal.photos}</p>
                    </div>
                )}

                {settleError && <p className="text-red-500">{settleError}</p>}
                {settleSuccess && <p className="text-green-500">{settleSuccess}</p>}

                <div className=' flex flex-row justify-between'>
                    <button
                        onClick={handleSettleExpense}
                        className={`mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 ${settleLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={settleLoading}
                    >
                        {settleLoading ? 'Settling...' : 'Settle Expense'}
                    </button>

                    <button
                        onClick={() => navigate('/userExpenses')}
                        className="mt-4 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Back to Expenses
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExpenseDetails;
