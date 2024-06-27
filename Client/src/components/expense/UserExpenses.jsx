
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SettlementHistory from './GetAllSettlements';
const UserExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/signup');
                    setError('You must be logged in to view expenses');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:4000/getUserExpenses', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.success) {
                    setExpenses(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('An error occurred while fetching the expenses');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    const handleCardClick = (expenseId) => {
        navigate(`/expenses/${expenseId}`);
    };

    const handleCreateExpense = () => {
        navigate('/createExpense');
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-row min-h-screen bg-slate-200 relative  px-3">
            <div className="flex flex-col w-[50%] mt-4">
                <div className="w-[100%] text-center border-2 border-slate-300 h-[500px] rounded-xl shadow-lg ml-4">Graph</div>
                <div className="w-[100%] text-center border-2 border-slate-300 h-[500px] rounded-xl shadow-lg ml-4 mt-6">Graph</div>
            </div>
            <div className="flex flex-col w-[50%] px-1 mt-4 mr-8">
                <div className="w-full max-w-4xl p-2 ml-8 mb-4 rounded-lg border-2 border-slate-300 shadow-lg pb-2">
                    <h2 className="text-3xl font-bold mb-6 text-slate-600">Your Expenses</h2>
                    {expenses.length === 0 ? (
                        <div className="flex flex-col items-center">
                            <p className="text-lg mb-4">You have no expenses. Create one now!</p>
                            <button
                                onClick={handleCreateExpense}
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                            >
                                Create New Expense
                            </button>
                        </div>
                    ) : (
                        <div className=" flex flex-col gap-4">
                            {expenses.map((expense) => (
                                <div
                                    key={expense._id}
                                    className="bg-slate-900 p-6 rounded-lg shadow-md shadow-slate-800 cursor-pointer hover:shadow-xl transition duration-200"
                                    onClick={() => handleCardClick(expense._id)}
                                >
                                    <h3 className="text-xl text-slate-100 font-semibold mb-2">{expense.expenseHeading}</h3>
                                    <p className="text-slate-200 mb-2">{expense.descriptions}</p>
                                    <p className="text-slate-400 mb-2">Total Cost: ${expense.totalCost}</p>
                                    {expense.share ? (
                                        <p className="text-blue-500">Shared Expense</p>
                                    ) : (
                                        <p className="text-green-500">Personal Expense</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="text-center w-full border-2 ml-8 shadow-lg rounded-lg border-slate-300">
                    {/* Render settlement history component */}
                    <SettlementHistory />
                </div>
            </div>
            {expenses.length > 0 && (
                <button
                    onClick={handleCreateExpense}
                    className="fixed bottom-8 right-8 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200 shadow-lg"
                >
                    Create New Expense
                </button>
            )}
        </div>
    );
};

export default UserExpenses;