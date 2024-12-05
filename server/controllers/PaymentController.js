const axios = require('axios');
const { PAYPAL_API, getPayPalToken } = require('../configs/paypal.config');
const Payment = require('../models/Payment.model');
const Product = require('../models/Product.model');
const Variant = require('../models/Variant.model');
const User = require('../models/User.model');
const Order = require('../models/Order.model');
const { getConversionRate } = require('../utils/convertCurrency');
const { isInStock } = require('../services/VariantService');
const Promotion = require('../models/Promotion.model');
const VariantService = require('../services/VariantService');
const ProductBuyer = require('../models/ProductBuyer.model');

const PaymentController = {
    getAll: async (req, res) => {
        try {
            const payments = await Payment.find({}).populate('order');
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getLatestPayments: async (req, res) => {
        try {
            const payments = await Payment.find({})
                .sort({ createdAt: -1 })
                .limit(10)
                .populate({
                    path: 'order',
                    populate: {
                        path: 'user',
                    },
                });
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
        const { user, items, address, email, phoneNumber, promotionCode, method } = req.body;
        try {
            if (items.length === 0) {
                return res.status(400).json({ message: 'Cart is empty' });
            }

            for (const item of items) {
                const { product, variant } = item;
                const isMatchProduct = variant.product.toString() === product._id.toString();
                if (!isMatchProduct) {
                    return res.status(400).json({ message: 'Cart is not match with product' });
                }
                const inStock = await VariantService.isInStock(variant._id);
                if (!inStock) {
                    return res.status(400).json({ message: 'Out of stock' });
                }
            }

            const newOrder = new Order({
                user,
                status: 'PENDING_PAYMENT',
                totalPrice: 0,
                address,
                email,
                phoneNumber,
            });
            for (const item of items) {
                const { product, variant } = item;
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
                    item.quantity * (!isNaN(variant.priceSale) ? variant.priceSale : variant.price);
                newOrder.totalPrice += totalPrice;

                // update unit sold
                const updatedProduct = await Product.findOne({ _id: product._id });
                updatedProduct.unitsSold += item.quantity;
                await updatedProduct.save();
            }
            // assign adjusted total price
            newOrder.originalTotalPrice = newOrder.totalPrice;
            newOrder.adjustedTotalPrice = newOrder.totalPrice;

            if (promotionCode) {
                const promotion = await Promotion.findOne({ code: promotionCode });

                if (!promotion) {
                    return res.status(400).json({ message: 'Promotion code not found' });
                }

                if (promotion.quantity > 0) {
                    promotion.quantity -= 1; // Reduce available promotion quantity
                    await promotion.save();
                } else {
                    return res.status(400).json({ message: 'Promotion out of stock' });
                }

                // Calculate discount
                const discountRate = promotion.discount / 100; // Discount percentage
                const discountAmount = Math.floor(newOrder.totalPrice * discountRate); // Discount amount

                newOrder.adjustedTotalPrice = newOrder.totalPrice - discountAmount; // Adjusted price with discount
                newOrder.totalPrice = newOrder.adjustedTotalPrice; // Update total price
                newOrder.promotionCode = promotion._id;
            }

            const savedOrder = await newOrder.save();

            // remove item in cart
            const updatedUser = await User.findById(user);
            updatedUser.cart = updatedUser.cart.filter(
                (cartItem) =>
                    !items.find(
                        (item) =>
                            item.product._id === cartItem.product.toString() &&
                            item.variant._id === cartItem.variant.toString(),
                    ),
            );

            await updatedUser.save();
            if (method === 'COD') {
                savedOrder.paymentMethod = 'COD';
                await savedOrder.save();
                const newPayment = new Payment({
                    order: savedOrder._id,
                    amount: savedOrder.adjustedTotalPrice ?? savedOrder.originalTotalPrice,
                    details: '',
                    payRef: savedOrder._id,
                    paid: false,
                    paymentMethod: method,
                });
                await newPayment.save();
                const variants = items.map((item) => ({
                    varaint: item.variant,
                    quantity: item.quantity,
                }));
                for (const variant of variants) {
                    const updatedVariant = await Variant.findOne({
                        _id: variant.varaint._id,
                    });
                    updatedVariant.stock -= variant.quantity;
                    await updatedVariant.save();
                }
                return res.status(200).json({ message: 'Order created', order: savedOrder });
            }
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
                                value: (savedOrder.adjustedTotalPrice * rate).toFixed(2), // Adjusted total price
                                breakdown: {
                                    item_total: {
                                        currency_code: 'USD',
                                        value: (savedOrder.originalTotalPrice * rate).toFixed(2), // Original total price
                                    },
                                    discount: {
                                        currency_code: 'USD',
                                        value: (
                                            (savedOrder.originalTotalPrice -
                                                savedOrder.adjustedTotalPrice) *
                                            rate
                                        ).toFixed(2), // Discount
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

            savedOrder.paymentMethod = 'PAYPAL';
            await savedOrder.save();
            const newPayment = new Payment({
                order: savedOrder._id,
                amount: savedOrder.totalPrice,
                details: '',
                payRef: response.data.id,
                paid: false,
                paymentMethod: method,
            });
            await newPayment.save();
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
                // should be minus variant stock
                const variants = updatedOrder.items.map((item) => ({
                    varaint: item.variant,
                    quantity: item.quantity,
                }));

                for (const variant of variants) {
                    const updatedVariant = await Variant.findOne({ _id: variant.varaint });
                    updatedVariant.stock -= variant.quantity;
                    await updatedVariant.save();
                }
                for (const item of updatedOrder.items) {
                    await ProductBuyer.create({
                        user: updatedOrder.user,
                        product: item.product,
                    });
                }
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
