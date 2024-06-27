// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend } from 'recharts';
// import SettlementHistory from './GetAllSettlements';

// const UserExpenses = () => {
//     const [expenses, setExpenses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchExpenses = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     navigate('/signup');
//                     setError('You must be logged in to view expenses');
//                     setLoading(false);
//                     return;
//                 }

//                 const response = await axios.get('http://localhost:4000/getUserExpenses', {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 console.log(response);

//                 if (response.data.status === 200 ) {
//                     setExpenses(response.data.data);
//                     console.log("expense",expenses)
//                 } else {
//                     setError(response.data.message);
//                 }

//                 console.log("expenses:",expenses)
//             } catch (err) {
//                 setError('An error occurred while fetching the expenses');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchExpenses();
//     }, []);

//     // Calculate totals for personal and shared expenses
//     const calculateTotals = () => {
//         let totalPersonal = 0;
//         let totalShared = 0;

//         expenses.forEach((expense) => {
//             if (expense.share) {
//                 totalShared += expense.totalCost;
//             } else {
//                 totalPersonal += expense.totalCost;
//             }
//         });

//         return { totalPersonal, totalShared };
//     };

//     if (loading) {
//         return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
//     }

//     if (error) {
//         return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
//     }

//     // Data for the charts
//     const { totalPersonal, totalShared } = calculateTotals();
//     const dataForBarChart = [
//         { category: 'Personal', totalCost: totalPersonal },
//         { category: 'Shared', totalCost: totalShared }
//     ];

//     const dataForLineChart = expenses.map((expense) => ({
//         name: expense.expenseHeading,
//         personal: expense.share ? 0 : expense.totalCost,
//         shared: expense.share ? expense.totalCost : 0
//     }));

//     return (
//         <div className="flex flex-row min-h-screen bg-slate-200 relative  px-3">
//             <div className="flex flex-col w-[50%] mt-4 ">
//                 <div className=" flex flex-col items-center justify-center right-1 w-[100%] text-center border-2 border-slate-300 h-[500px] rounded-xl mx-auto shadow-lg ml-2">
//                     <h2 className="text-lg font-semibold mb-2">Bar Chart: Total Costs Comparison</h2>
//                     <BarChart width={550} height={400} data={dataForBarChart}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="category" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="totalCost" fill="#8884d8" />
//                     </BarChart>
//                 </div>
//                 <div className="w-[100%] text-center border-2 border-slate-300 h-[500px] rounded-xl shadow-lg ml-4 mt-6 mb-6">
//                     <h2 className="text-lg font-semibold mb-2">Line Chart: Expense Trend</h2>
//                     <LineChart width={550} height={400} data={dataForLineChart}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Line type="monotone" dataKey="personal" stroke="#8884d8" />
//                         <Line type="monotone" dataKey="shared" stroke="#82ca9d" />
//                     </LineChart>
//                 </div>
//             </div>
//             <div className="flex flex-col w-[50%] px-1 mt-4 mr-8">
//                 <div className="w-full max-w-4xl p-2 ml-8 mb-4 rounded-lg border-2 border-slate-300 shadow-lg pb-2">
//                     <h2 className="text-3xl font-bold mb-6 text-slate-600">Your Expenses</h2>
//                     {expenses.length === 0 ? (
//                         <div className="flex flex-col items-center">
//                             <p className="text-lg mb-4">You have no expenses. Create one now!</p>
//                             <button
//                                 onClick={() => navigate('/createExpense')}
//                                 className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
//                             >
//                                 Create New Expense
//                             </button>
//                         </div>
//                     ) : (
//                         <div className=" flex flex-col gap-4">
//                             {expenses.map((expense) => (
//                                 <div
//                                     key={expense._id}
//                                     className="bg-slate-900 p-6 rounded-lg shadow-md shadow-slate-800 cursor-pointer hover:shadow-xl transition duration-200"
//                                     onClick={() => navigate(`/expenses/${expense._id}`)}
//                                 >
//                                     <h3 className="text-xl text-slate-100 font-semibold mb-2">{expense.expenseHeading}</h3>
//                                     <p className="text-slate-200 mb-2">{expense.descriptions}</p>
//                                     <p className="text-slate-400 mb-2">Total Cost: ${expense.totalCost}</p>
//                                     {expense.share ? (
//                                         <p className="text-blue-500">Shared Expense</p>
//                                     ) : (
//                                         <p className="text-green-500">Personal Expense</p>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//                 <div className="text-center w-full border-2 ml-8 shadow-lg rounded-lg border-slate-300">
//                     {/* Render settlement history component */}
//                     <SettlementHistory />
//                 </div>
//             </div>
//             {expenses.length > 0 && (
//                 <button
//                     onClick={() => navigate('/createExpense')}
//                     className="fixed bottom-8 right-8 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200 shadow-lg"
//                 >
//                     Create New Expense
//                 </button>
//             )}
//         </div>
//     );
// };

// export default UserExpenses;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
                    console.log("Expenses fetched:", response.data.data);
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
    }, [navigate]);

    // Calculate totals for personal and shared expenses
    const calculateTotals = () => {
        let totalPersonal = 0;
        let totalShared = 0;

        expenses.forEach((expense) => {
            if (expense.share) {
                totalShared += parseFloat(expense.share.totalCost); // Convert to float and add to totalShared
            } else {
                totalPersonal += parseFloat(expense.personal.totalCost); // Convert to float and add to totalPersonal
            }
        });

        return { totalPersonal, totalShared };
    };

    // Find the maximum total cost
    const findMaxTotalCost = () => {
        const { totalPersonal, totalShared } = calculateTotals();
        return Math.max(totalPersonal, totalShared);
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
    }

    // Data for the pie chart
    const { totalPersonal, totalShared } = calculateTotals();
    const dataForPieChart = [
        { name: 'Personal', value: totalPersonal },
        { name: 'Shared', value: totalShared }
    ];

    // Data for the bar chart
    const dataForBarChart = [
        { category: 'Personal', totalCost: totalPersonal },
        { category: 'Shared', totalCost: totalShared }
    ];

    const maxTotalCost = findMaxTotalCost();
    const yAxisDomain = [0, Math.ceil(maxTotalCost / 100)]; // Scale the Y-axis to the nearest higher hundred

    console.log("Data for Pie Chart:", dataForPieChart);
    console.log("Data for Bar Chart:", dataForBarChart);
    console.log("Max Total Cost:", maxTotalCost);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-8">
                {/* Pie Chart Section */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-semibold mb-4 text-center">Pie Chart: Expense Distribution</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                data={dataForPieChart}
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#4F46E5"
                                label
                            />
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart Section */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-semibold mb-4 text-center">Bar Chart: Total Costs Comparison</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={dataForBarChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis domain={yAxisDomain} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalCost" fill="#4F46E5" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Expenses List Section */}
            <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-2xl font-semibold mb-4 text-center">Your Expenses</h2>
                {expenses.length === 0 ? (
                    <div className="flex flex-col items-center">
                        <p className="text-lg mb-4">You have no expenses. Create one now!</p>
                        <button
                            onClick={() => navigate('/createExpense')}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Create New Expense
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {expenses.map((expense) => (
                            <div
                                key={expense._id}
                                className="bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
                                onClick={() => navigate(`/expenses/${expense._id}`)}
                            >
                                <h3 className="text-xl font-semibold mb-2">{expense.expenseHeading}</h3>
                                <p className="text-gray-700 mb-2">{expense.descriptions}</p>
                                <p className="text-gray-500 mb-2">Total Cost: ${expense.totalCost}</p>
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

            {/* Settlement History Section */}
            <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-lg font-semibold mb-4 text-center">Settlement History</h2>
                <SettlementHistory />
            </div>

            {/* Floating Button to Create New Expense */}
            {expenses.length > 0 && (
                <button
                    onClick={() => navigate('/createExpense')}
                    className="fixed bottom-8 right-8 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200 shadow-lg"
                >
                    Create New Expense
                </button>
            )}
        </div>
    );
};

export default UserExpenses;






