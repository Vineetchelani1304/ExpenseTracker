import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BACKEND_URL from '../../utils/backendUrl';

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

                const response = await axios.get(`${BACKEND_URL}/expenses/${expenseId}`, {
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

            const response = await axios.post(`${BACKEND_URL}/settleExpense`, {
                expenseId,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

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
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-red-500">
                <p className="text-2xl font-semibold">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!expenseDetails) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl text-gray-800">
                <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-900">Expense Details</h2>
                <h3 className="text-3xl font-semibold mb-4 text-gray-800">{expenseDetails.expenseHeading}</h3>
                <p className="text-lg mb-6 text-gray-700">{expenseDetails.descriptions}</p>

                {expenseDetails.share ? (
                    <div className="space-y-4">
                        <p className="text-blue-600 font-semibold">Shared Expense</p>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-inner space-y-2">
                            <p><span className="font-semibold">Items Bought:</span> {expenseDetails.share.itemsBought.join(', ')}</p>
                            <p><span className="font-semibold">Items Count:</span> {expenseDetails.share.itemsCount}</p>
                            <p><span className="font-semibold">Total Cost:</span> ${expenseDetails.share.totalCost}</p>
                            <p><span className="font-semibold">Per Head Cost:</span> ${expenseDetails.share.perHead}</p>
                            <p><span className="font-semibold">Who Paid:</span> {expenseDetails.share.whoPaid}</p>
                            <p><span className="font-semibold">Payment Done:</span> {expenseDetails.share.paymentDone ? 'Yes' : 'No'}</p>
                            <p><span className="font-semibold">Share Count Emails:</span> {expenseDetails.share.shareCountEmail.join(', ')}</p>
                            <p><span className="font-semibold">Photos:</span> {expenseDetails.share.photos}</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-green-600 font-semibold">Personal Expense</p>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-inner space-y-2">
                            <p><span className="font-semibold">Items Bought:</span> {expenseDetails.personal.itemsBought.join(', ')}</p>
                            <p><span className="font-semibold">Items Count:</span> {expenseDetails.personal.itemsCount}</p>
                            <p><span className="font-semibold">Total Cost:</span> ${expenseDetails.personal.totalCost}</p>
                            <p><span className="font-semibold">Photos:</span> {expenseDetails.personal.photos}</p>
                        </div>
                    </div>
                )}

                {settleError && <p className="text-red-500 mt-4">{settleError}</p>}
                {settleSuccess && <p className="text-green-500 mt-4">{settleSuccess}</p>}

                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleSettleExpense}
                        className={`bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-200 ${settleLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={settleLoading}
                    >
                        {settleLoading ? 'Settling...' : 'Settle Expense'}
                    </button>
                    <button
                        onClick={() => navigate('/userExpenses')}
                        className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Back to Expenses
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExpenseDetails;
