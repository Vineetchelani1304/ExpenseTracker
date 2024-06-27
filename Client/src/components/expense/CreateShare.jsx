import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateShare = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { expenseId } = location.state || {};
    const [itemsBought, setItemsBought] = useState('');
    const [itemsCount, setItemsCount] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [whoPaid, setWhoPaid] = useState('');
    const [paymentDone, setPaymentDone] = useState('');
    const [shareCountEmail, setShareCountEmail] = useState('');
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
            setError('You must be logged in to create a shared expense');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/createShare', {
                expenseId,
                itemsBought: itemsBought.split(',').map(item => item.trim()),
                itemsCount,
                totalCost,
                whoPaid,
                paymentDone,
                shareCountEmail: shareCountEmail.split(',').map(email => email.trim())
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
            setError('An error occurred while creating the shared expense');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Shared Expense</h2>
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
                    <div className="mb-4">
                        <label htmlFor="whoPaid" className="block text-gray-700 mb-2">Who Paid</label>
                        <input
                            type="text"
                            id="whoPaid"
                            value={whoPaid}
                            onChange={(e) => setWhoPaid(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="paymentDone" className="block text-gray-700 mb-2">Payment Done</label>
                        <input
                            type="text"
                            id="paymentDone"
                            value={paymentDone}
                            onChange={(e) => setPaymentDone(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="shareCountEmail" className="block text-gray-700 mb-2">Share Count Email (comma separated)</label>
                        <input
                            type="text"
                            id="shareCountEmail"
                            value={shareCountEmail}
                            onChange={(e) => setShareCountEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ${loading ? 'cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Shared Expense'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateShare;
