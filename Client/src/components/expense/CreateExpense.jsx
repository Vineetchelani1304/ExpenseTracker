import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateExpense = () => {
    const [expenseHeading, setExpenseHeading] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [category, setCategory] = useState('share'); // Default to 'share'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to create an expense');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/createExpense', {
                expenseHeading,
                descriptions,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                const expenseId = response.data.data._id; // Assuming the response contains the created expense ID
                if (category === 'share') {
                    navigate('/createShare', { state: { expenseId } });
                } else if (category === 'personal') {
                    navigate('/createPersonal', { state: { expenseId } });
                }
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred while creating the expense');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  bg-slate-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Create Expense</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="expenseHeading" className="block text-slate-800 mb-2">Expense Heading</label>
                        <input
                            type="text"
                            id="expenseHeading"
                            value={expenseHeading}
                            onChange={(e) => setExpenseHeading(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-500 rounded-lg"
                            required
                            placeholder='Heading for Expense...'
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="descriptions" className="block  text-slate-800 mb-2">Descriptions</label>
                        <textarea
                            id="descriptions"
                            value={descriptions}
                            onChange={(e) => setDescriptions(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-500 rounded-lg"
                            required
                            placeholder='Description...'
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block  text-slate-800 mb-2">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-500 rounded-lg"
                        >
                            <option value="share">Share</option>
                            <option value="personal">Personal</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ${loading ? 'cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Expense'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateExpense;
