const axios = require('axios');
const { PAYPAL_API, getPayPalToken } = require('../configs/paypal.config');
const Payment = require('../models/Payment.model');
const Product = require('../models/Product.model');
const Variant = require('../models/Variant.model');
const User = require('../models/User.model');
const Order = require('../models/Order.model');
const { getConversionRate } = require('../utils/convertCurrency');
const { getAll } = require('./ProductController');

const PaymentController = {
    getAll: async (req, res) => {
        try {
            const payments = await Payment.find({}).populate('order');
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const payment = await Payment.findOne({ _id: id }).populate('order');
            if (!payment) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getByPayRef: async (req, res) => {
        try {
            const { payRef } = req.params;
            const payment = await Payment.findOne({ payRef }).populate('order');
            if (!payment) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createOrder: async (req, res) => {
        const { user, items } = req.body;
        try {
            if (items.length === 0) {
                return res.status(400).json({ message: 'Cart is empty' });
            }
            const newOrder = new Order({
                user,
                status: 'PENDING_PAYMENT',
                totalPrice: 0,
            });

            for (const item of items) {
                const product = await Product.findOne({ _id: item.product })
                    .populate('brand')
                    .populate('category');
                const variant = await Variant.findOne({ _id: item.variant });

                newOrder.items.push({
                    product: product._id,
                    variant: variant._id,
                    productName: product.nameEn,
                    category: product.category.nameEn,
                    brand: product.brand.nameEn,
                    image: product.imagePath,
                    size: variant.size,
                    price: variant.price,
                    priceSale: variant.priceSale,
                    quantity: item.quantity,
                });
                const totalPrice =
                    item.quantity * (variant.priceSale ? variant.priceSale : variant.price);
                newOrder.totalPrice += totalPrice;
            }

            const savedOrder = await newOrder.save();

            // remove item in cart
            const updatedUser = await User.findById(user);
            updatedUser.cart = updatedUser.cart.filter(
                (cartItem) =>
                    !items.find(
                        (item) =>
                            item.product === cartItem.product.toString() &&
                            item.variant === cartItem.variant.toString(),
                    ),
            );
            await updatedUser.save();

            const token = await getPayPalToken();
            const rate = await getConversionRate();
            const response = await axios({
                method: 'post',
                url: `${PAYPAL_API}/v2/checkout/orders`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify({
                    intent: 'CAPTURE',
                    purchase_units: [
                        {
                            reference_id: savedOrder._id,
                            items: savedOrder.items.map((item) => ({
                                name: item.productName,
                                description: item.productName,
                                unit_amount: {
                                    currency_code: 'USD',
                                    value: ((item.priceSale || item.price) * rate).toFixed(2),
                                },
                                quantity: item.quantity.toString(),
                            })),
                            amount: {
                                currency_code: 'USD',
                                value: (savedOrder.totalPrice * rate).toFixed(2),
                                breakdown: {
                                    item_total: {
                                        currency_code: 'USD',
                                        value: (savedOrder.totalPrice * rate).toFixed(2),
                                    },
                                },
                            },
                        },
                    ],
                    payment_source: {
                        paypal: {
                            experience_context: {
                                brand_name: 'TOMTOC PERFUMES',
                                shipping_preference: 'NO_SHIPPING',
                                user_action: 'PAY_NOW',
                                // return_url: `${process.env.CLIENT_URL}/success`,
                                // cancel_url: `${process.env.CLIENT_URL}/cancel`,
                            },
                        },
                    },
                }),
            });

            const newPayment = new Payment({
                order: savedOrder._id,
                amount: savedOrder.totalPrice,
                details: '',
                payRef: response.data.id,
                paid: false,
                paymentMethod: 'PAYPAL',
            });
            await newPayment.save();
            // const approvalUrl = response.data.links.find(
            //     (link) => link.rel === 'payer-action',
            // ).href;
            res.status(200).json({ payRef: response.data.id });
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
                await Payment.findOneAndUpdate(
                    { payRef: paymentId },
                    { paid: true, details: JSON.stringify(response.data) },
                );

                const updatedOrder = await Order.findOneAndUpdate(
                    { _id: response.data.purchase_units[0].reference_id },
                    { status: 'PAID' },
                );

                res.status(200).json({ message: 'Payment successful', order: updatedOrder });
            } else {
                res.status(400).json({ message: 'Payment not completed' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = PaymentController;
