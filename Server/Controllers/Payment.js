import Razorpay from 'razorpay';

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const generateQRCode = async (req, res) => {
    const { amount, name } = req.body;

    try {
        const qrCode = await razorpayInstance.qrCode.create({
            type: 'upi_qr',
            name: name || 'Expense Tracker',
            usage: 'single_use',
            fixed_amount: true,
            payment_amount: amount * 100, // Razorpay requires amount in paise
            description: 'Payment for Expenses'
        });

        res.status(200).json({ success: true, qrCode });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
