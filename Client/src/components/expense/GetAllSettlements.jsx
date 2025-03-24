import  { useState, useEffect } from 'react';
import axios from 'axios';

const SettlementHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('User not authenticated');
                }

                const response = await axios.get('https://expensetracker-rtqz.onrender.com/getSettlements', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.success) {
                    setHistory(response.data.history );
                } else {
                    throw new Error(response.data.message);
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch history');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Settlement History</h2>
            {history.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {history.map((item) => (
                        <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="text-xl font-semibold mb-2">{item.expense.expenseHeading}</h3>
                            <p className="text-gray-600">{item.expense.descriptions}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center mt-4">No settlement history available</p>
            )}
        </div>
    );
};

export default SettlementHistory;
