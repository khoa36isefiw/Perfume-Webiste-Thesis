const { PAYPAL_API, getPayPalToken } = require('../configs/paypal.config');
const Payment = require('../models/Payment.model');

const PaymentController = {
    createOrder: async (req, res) => {
        const { userId, orderDetails } = req.body;
        try {
            const newOrder = new Order({
                user: userId,
                items: orderDetails.items,
                totalPrice: orderDetails.totalPrice,
                email: orderDetails.email,
                address: orderDetails.address,
                phoneNumber: orderDetails.phoneNumber,
                status: 'PENDING_PAYMENT',
            });

            const savedOrder = await newOrder.save();

            const token = await getPayPalToken();

            const response = await axios.post(
                `${PAYPAL_API}/v2/checkout/orders`,
                {
                    intent: 'CAPTURE',
                    purchase_units: [
                        {
                            amount: {
                                currency_code: 'USD',
                                value: savedOrder.totalPrice,
                            },
                        },
                    ],
                    application_context: {
                        return_url: `${process.env.CLIENT_URL}/success?orderId=${orderId}`,
                        cancel_url: `${process.env.CLIENT_URL}/cancel`,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            const newPayment = new Payment({
                orderId: savedOrder._id,
                amount: savedOrder.totalPrice,
                details: response.data.id, // PayPal order ID
                paid: false,
                paymentMethod: 'PAYPAL',
            });
            await newPayment.save();

            res.json({ id: response.data.id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    captureOrder: async (req, res) => {
        const { paymentId } = req.body;

        try {
            const token = await getPayPalToken();
            const response = await axios.post(
                `${PAYPAL_API}/v2/checkout/orders/${paymentId}/capture`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.data.status === 'COMPLETED') {
                // Update the payment and order status in MongoDB
                await Payment.findOneAndUpdate(
                    { details: paymentId },
                    { paid: true, details: JSON.stringify(response.data) },
                );

                await Order.findOneAndUpdate(
                    { _id: response.data.purchase_units[0].reference_id },
                    { status: 'PAID' },
                );

                res.json({ message: 'Payment successful', status: 'PAID' });
            } else {
                await Payment.findOneAndUpdate({ details: paymentId }, { paid: false });
                res.json({ message: 'Payment failed', status: 'PENDING_PAYMENT' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = PaymentController;
