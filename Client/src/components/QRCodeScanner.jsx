import axios from 'axios';

const RazorpayPayment = () => {
    const handlePayment = async () => {
        const { data } = await axios.post('/api/create-order', {
            amount: 40000,  // Replace with your dynamic amount
            currency: 'INR'
        });

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Razorpay Key ID
            amount: data.order.amount,
            currency: data.order.currency,
            name: "Expense Tracker",
            description: "Payment for expenses",
            order_id: data.order.id,
            handler: async (response) => {
                try {
                    const verifyRes = await axios.post('/api/payments/verify-payment', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    });

                    if (verifyRes.data.success) {
                        alert("Payment Successful!");
                    } else {
                        alert("Payment Verification Failed!");
                    }
                } catch (error) {
                    console.error("Verification Error:", error);
                    alert("Payment verification error. Please try again.");
                }
            },
            theme: { color: "#4CAF50" }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-blue-600">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
                <h2 className="text-2xl font-bold mb-4 text-green-700">Confirm Your Payment</h2>

                <p className="text-gray-600 mb-4">Amount to Pay: <strong>₹40,000</strong></p>

                <button
                    onClick={handlePayment}
                    className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
                >
                    Pay with Razorpay
                </button>

                <p className="text-gray-500 text-sm mt-6">
                    Powered by <span className="font-bold">Razorpay</span>.
                </p>
            </div>
        </div>
    );
};

export default RazorpayPayment;
