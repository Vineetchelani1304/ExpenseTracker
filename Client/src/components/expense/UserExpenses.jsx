import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        navigate(`/expense/${expenseId}`);
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Your Expenses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {expenses.map((expense) => (
                        <div
                            key={expense._id}
                            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition duration-200"
                            onClick={() => handleCardClick(expense._id)}
                        >
                            <h3 className="text-xl font-semibold mb-2">{expense.expenseHeading}</h3>
                            <p className="text-gray-700 mb-2">{expense.descriptions}</p>
                            <p className="text-gray-700 mb-2">Total Cost: ${expense.totalCost}</p>
                            {expense.share ? (
                                <p className="text-blue-500">Shared Expense</p>
                            ) : (
                                <p className="text-green-500">Personal Expense</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserExpenses;
