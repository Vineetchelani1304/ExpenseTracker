import  { useEffect, useState } from 'react';
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

            console.log('expenseId', expenseId);

            const response = await axios.post(`${BACKEND_URL}/settleExpense`, {
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
            <div className="bg-white p-8 rounded-lg shadow-xl-slate w-fit max-w-4xl text-black">
                <h2 className="text-3xl font-bold mb-6 text-center">Expense Details</h2>
                <h3 className="text-2xl text-slate-900 font-semibold mb-2">{expenseDetails.expenseHeading}</h3>
                <p className=" mb-2 text-xl text-slate-700 ">{expenseDetails.descriptions}</p>

                {expenseDetails.share ? (
                    <div>
                        <p className="text-blue-500">Shared Expense</p>
                        <p className=' text-slate-900 bg-slate-100 rounded-md p-1 mt-4'>Items Bought: {expenseDetails.share.itemsBought.join(', ')}</p>
                        <p className=' text-slate-900 bg-slate-100 rounded-md p-1 mt-4'>Items Count: {expenseDetails.share.itemsCount}</p>
                        <p className=' text-slate-900 bg-slate-100 rounded-md p-1 mt-4'>Total Cost: ${expenseDetails.share.totalCost}</p>
                        <p className=' text-slate-900 bg-slate-100 rounded-md p-1 mt-4'>Per Head Cost: ${expenseDetails.share.perHead}</p>
                        <p className=' text-slate-900 bg-slate-100 rounded-md p-1 mt-4'>Who Paid: {expenseDetails.share.whoPaid}</p>
                        <p className=' text-slate-900 bg-slate-100 rounded-md p-1 mt-4'>Payment Done: {expenseDetails.share.paymentDone ? 'Yes' : 'No'}</p>
                        <p className=' text-slate-900 bg-slate-100 rounded-md p-1 mt-4'>Share Count Emails: {expenseDetails.share.shareCountEmail.join(', ')}</p>
                        <p className=' text-slate-900 bg-slate-100 rounded-md p-1 mt-4'>Photos: {expenseDetails.share.photos}</p>
                    </div>
                ) : (
                    <div>
                        <p className="text-green-500">Personal Expense</p>
                        <p className=' bg-slate-100 p-1 rounded-md text-slate-900 mt-4'>Items Bought: {expenseDetails.personal.itemsBought.join(', ')}</p>
                        <p className=' bg-slate-100 p-1 rounded-md text-slate-900 mt-4'>Items Count: {expenseDetails.personal.itemsCount}</p>
                        <p className=' bg-slate-100 p-1 rounded-md text-slate-900 mt-4'>Total Cost: ${expenseDetails.personal.totalCost}</p>
                        <p className=' bg-slate-100 p-1 rounded-md text-slate-900 mt-4'>Photos: {expenseDetails.personal.photos}</p>
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

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { QrCode } from 'lucide-react';
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import PropTypes from 'prop-types';

// const API_KEY = 'vayYbpQm44BSNiHzqyvb'; // Hardcoded API Key
// const BASE_URL = 'https://expensetracker-rtqz.onrender.com';

// const QRCodeScanner = ({ onScanSuccess }) => {
// QRCodeScanner.propTypes = {
//     onScanSuccess: PropTypes.func.isRequired,
// };
//     useEffect(() => {
//         const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

//         scanner.render(
//             (decodedText) => {
//                 onScanSuccess(decodedText);
//                 scanner.clear();
//             },
//             (error) => {
//                 console.error(`QR Code Scan Error: ${error}`);
//             }
//         );

//         return () => scanner.clear();
//     }, [onScanSuccess]);

//     return <div id="reader" style={{ width: "300px" }}></div>;
// };

// const ExpenseDetails = () => {
//     const { expenseId } = useParams();
//     const [expenseDetails, setExpenseDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [scannerVisible, setScannerVisible] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchExpenseDetails = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     setError('You must be logged in to view expense details');
//                     setLoading(false);
//                     return;
//                 }

//                 const response = await axios.get(`${BASE_URL}/expenses/${expenseId}`, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });

//                 if (response.data.success) {
//                     setExpenseDetails(response.data.data);
//                 } else {
//                     setError(response.data.message);
//                 }
//             } catch (err) {
//                 setError('An error occurred while fetching the expense details');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchExpenseDetails();
//     }, [expenseId]);

//     const generateReceipt = async (expenseDetails) => {
//         try {
//             console.log("Expense details:", expenseDetails);
    
//             const expenseData = {
//                 expenseHeading: expenseDetails.expenseHeading || 'N/A',
//                 descriptions: expenseDetails.descriptions || 'N/A',
//                 amount: expenseDetails.personal?.totalCost?.toString() || expenseDetails.amount?.toString() || '0',
//                 itemsBought: expenseDetails.personal?.itemsBought?.join(', ') || 'N/A',
//                 itemsCount: expenseDetails.personal?.itemsCount?.toString() || '0',
//                 date: expenseDetails.createdAt
//                     ? new Date(expenseDetails.createdAt).toISOString().split('T')[0]
//                     : 'N/A',
//                 paymentStatus: expenseDetails.isPaid ? 'Paid' : 'Pending'
//             };
    
//             const response = await axios.post('https://api.pdfmonkey.io/api/v1/documents', {
//                 document: {
//                     document_template_id: '3157EC41-B6FD-4462-9DB9-63227A4ECF00', // Ensure ID is correct
//                     data: expenseData
//                 }
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${API_KEY}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
    
//             const documentId = response.data?.document?.id;
//             if (!documentId) throw new Error('Document ID not found.');
    
//             const pollDocumentStatus = async () => {
//                 const MAX_RETRIES = 30; // Increased retries
//                 const DELAY = 4000;    // 4 seconds delay for better response handling
//                 let attempt = 0;
    
//                 while (attempt < MAX_RETRIES) {
//                     const statusResponse = await axios.get(`https://api.pdfmonkey.io/api/v1/documents/${documentId}`, {
//                         headers: { 'Authorization': `Bearer ${API_KEY}` }
//                     });
    
//                     const documentStatus = statusResponse.data?.document?.status;
//                     if (documentStatus === 'success') {
//                         const downloadUrl = statusResponse.data.document.download_url;
//                         window.open(downloadUrl, '_blank');
//                         return;
//                     }
    
//                     if (documentStatus === 'failed') {
//                         throw new Error('Document generation failed.');
//                     }
    
//                     await new Promise((resolve) => setTimeout(resolve, DELAY));
//                     attempt++;
//                 }
    
//                 throw new Error('Document generation timed out. The API may be experiencing delays.');
//             };
    
//             await pollDocumentStatus();
//         } catch (error) {
//             console.error('Error generating receipt:', error.response?.data || error.message);
    
//             const errorDetails = error.response?.data?.errors || error.message;
//             alert(`Failed to generate receipt. Error: ${JSON.stringify(errorDetails)}`);
//         }
//     };
     
//     const handleScanSuccess = async (decodedText) => {
//         try {
//             const response = await axios.post('/api/payments/verify-payment', {
//                 payment_id: decodedText
//             });

//             if (response.data.success) {
//                 alert('Payment Successful!');
//             } else {
//                 alert('Payment Failed. Please try again.');
//             }
//         } catch (error) {
//             console.error('Payment Verification Error:', error);
//             alert('Error verifying payment.');
//         }
//     };

//     if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
//     if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
//     if (!expenseDetails) return null;

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-xl-slate w-fit max-w-4xl text-black">
//                 <h2 className="text-3xl font-bold mb-6 text-center">Expense Details</h2>
//                 <h3 className="text-2xl text-slate-900 font-semibold mb-2">{expenseDetails.expenseHeading}</h3>
//                 <p className="mb-2 text-xl text-slate-700">{expenseDetails.descriptions}</p>

//                 <p className="text-lg font-semibold mt-2">Amount: ₹ </p>
//                 <p className="text-lg">Date: {new Date(expenseDetails.date).toLocaleDateString()}</p>
//                 <p className="text-lg">Payment Status: {expenseDetails.isPaid ? 'Paid' : 'Pending'}</p>

//                 <div className='flex flex-row justify-between'>
//                     <button
//                         className="mt-4 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition duration-200"
//                         onClick={() => setScannerVisible(!scannerVisible)}
//                     >
//                         <QrCode className="inline-block mr-2" />
//                         Scan QR Code
//                     </button>

//                     <button
//                         onClick={() => navigate('/userExpenses')}
//                         className="mt-4 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition duration-200"
//                     >
//                         Back to Expenses
//                     </button>

//                     <button
//                         className="mt-4 bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition duration-200"
//                         onClick={() => generateReceipt(expenseDetails)}
//                     >
//                         Download Receipt
//                     </button>
//                 </div>

//                 {scannerVisible && <QRCodeScanner onScanSuccess={handleScanSuccess} />}
//             </div>
//         </div>
//     );
// };

// export default ExpenseDetails;
