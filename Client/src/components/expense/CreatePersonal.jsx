import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CreatePersonal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { expenseId } = location.state || {}; // Get expenseId from location.state
    const [itemsBought, setItemsBought] = useState('');
    const [itemsCount, setItemsCount] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!expenseId) {
            setError('No expense ID provided');
            setLoading(false);
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to create a personal expense');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/createPersonal', {
                expenseId,
                itemsBought: itemsBought.split(',').map(item => item.trim()),
                itemsCount,
                totalCost,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                navigate('/');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred while creating the personal expense');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ml-[20%] bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Personal Expense</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="itemsBought" className="block text-gray-700 mb-2">Items Bought (comma separated)</label>
                        <input
                            type="text"
                            id="itemsBought"
                            value={itemsBought}
                            onChange={(e) => setItemsBought(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="itemsCount" className="block text-gray-700 mb-2">Items Count</label>
                        <input
                            type="number"
                            id="itemsCount"
                            value={itemsCount}
                            onChange={(e) => setItemsCount(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="totalCost" className="block text-gray-700 mb-2">Total Cost</label>
                        <input
                            type="number"
                            id="totalCost"
                            value={totalCost}
                            onChange={(e) => setTotalCost(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ${loading ? 'cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Personal Expense'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePersonal;
