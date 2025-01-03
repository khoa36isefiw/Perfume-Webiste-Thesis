const axios = require('axios');
const crypto = require('crypto');
const querystring = require('qs');
const moment = require('moment');
require('dotenv').config();
const { PAYPAL_API, getPayPalToken } = require('../config/paypal.config');
const Payment = require('../models/Payment.model');
const Product = require('../models/Product.model');
const Variant = require('../models/Variant.model');
const User = require('../models/User.model');
const Order = require('../models/Order.model');
const { getConversionRate } = require('../utils/convertCurrency');
const Promotion = require('../models/Promotion.model');
const VariantService = require('../services/VariantService');
const ProductBuyer = require('../models/ProductBuyer.model');
const sortObject = require('../utils/order');

const returnUrl = `${process.env.BASE_URL}/payments/vnpay/return`;
const vnp_TmnCode = process.env.VNPAY_TMN_CODE;
const vnp_HashSecret = process.env.VNPAY_HASH_SERECT;
const vnp_Url = process.env.VNPAY_URL;
const vnp_Api = process.env.VNPAY_API;

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
                paymentMethod: method,
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

                if (promotion.quantity > 0 && promotion.endDate > new Date()) {
                    promotion.quantity -= 1; // Reduce available promotion quantity
                    if (promotion.quantity === 0) {
                        promotion.status = 'inactive';
                    }
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

            // update quantity in stock
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

            if (method === 'COD') {
                const newPayment = new Payment({
                    order: savedOrder._id,
                    amount: savedOrder.adjustedTotalPrice ?? savedOrder.originalTotalPrice,
                    details: '',
                    payRef: savedOrder._id,
                    paid: false,
                    paymentMethod: method,
                });
                await newPayment.save();

                return res.status(200).json({ message: 'Order created', order: savedOrder });
            }

            if (method === 'VNPAY') {
                let date = new Date();
                let createDate = moment(date).format('YYYYMMDDHHmmss');

                let ipAddr =
                    req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress;

                let tmnCode = vnp_TmnCode;
                let secretKey = vnp_HashSecret;
                let vnpUrl = vnp_Url;
                let orderId = newOrder._id;

                let locale = 'vn';
                if (locale === null || locale === '') {
                    locale = 'vn';
                }
                let currCode = 'VND';
                let vnp_Params = {};
                vnp_Params['vnp_Version'] = '2.1.0';
                vnp_Params['vnp_Command'] = 'pay';
                vnp_Params['vnp_TmnCode'] = tmnCode;
                vnp_Params['vnp_Locale'] = locale;
                vnp_Params['vnp_CurrCode'] = currCode;
                vnp_Params['vnp_TxnRef'] = orderId;
                vnp_Params['vnp_OrderInfo'] = orderId;
                vnp_Params['vnp_OrderType'] = 'other';
                vnp_Params['vnp_Amount'] =
                    (savedOrder.adjustedTotalPrice || savedOrder.originalTotalPrice) * 100;
                vnp_Params['vnp_ReturnUrl'] = returnUrl;
                vnp_Params['vnp_IpAddr'] = ipAddr;
                vnp_Params['vnp_CreateDate'] = createDate;
                vnp_Params['vnp_BankCode'] = 'VNBANK';

                vnp_Params = sortObject(vnp_Params);

                let signData = querystring.stringify(vnp_Params, { encode: false });
                let hmac = crypto.createHmac('sha512', secretKey);
                let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
                vnp_Params['vnp_SecureHash'] = signed;
                vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

                const newPayment = new Payment({
                    order: savedOrder._id,
                    amount: savedOrder.totalPrice,
                    details: '',
                    payRef: savedOrder._id,
                    paid: false,
                    paymentMethod: method,
                });
                await newPayment.save();
                return res.status(200).json({ vnpUrl });
            }

            // When payment with paypal and totalPrice = 0;
            // if (savedOrder.adjustedTotalPrice === 0 || savedOrder.originalTotalPrice === 0) {
            //     const newPayment = new Payment({
            //         order: savedOrder._id,
            //         amount: savedOrder.adjustedTotalPrice ?? savedOrder.originalTotalPrice,
            //         details: '',
            //         payRef: savedOrder._id,
            //         paid: true,
            //         paymentMethod: method,
            //     });
            //     await newPayment.save();
            //     res.status(200).json({ payRef: response.data.id });
            // }
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
                // const variants = updatedOrder.items.map((item) => ({
                //     varaint: item.variant,
                //     quantity: item.quantity,
                // }));

                // for (const variant of variants) {
                //     const updatedVariant = await Variant.findOne({ _id: variant.varaint });
                //     updatedVariant.stock -= variant.quantity;
                //     await updatedVariant.save();
                // }
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

    vnpayReturn: async (req, res) => {
        let vnp_Params = req.query;
        console.log('=====', req.query);
        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);

        let secretKey = vnp_HashSecret;

        let signData = querystring.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac('sha512', secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        let vnp_OrderInfo = vnp_Params['vnp_OrderInfo'];

        if (secureHash === signed) {
            if (vnp_Params['vnp_ResponseCode'] == '00') {
                // save payment result to db
                await Payment.findOneAndUpdate(
                    { payRef: vnp_OrderInfo },
                    { paid: true, details: JSON.stringify(vnp_Params) },
                );

                const updatedOrder = await Order.findOneAndUpdate(
                    { _id: vnp_OrderInfo },
                    { status: 'PAID' },
                );
                for (const item of updatedOrder.items) {
                    await ProductBuyer.create({
                        user: updatedOrder.user,
                        product: item.product,
                    });
                }
                res.redirect(`${process.env.CLIENT_URL}/en/success?Ref=${vnp_OrderInfo}`);
            } else {
                res.redirect(`${process.env.CLIENT_URL}/en/cancel??Ref=${vnp_OrderInfo}`);
            }
        } else {
            res.redirect(`${process.env.CLIENT_URL}/en/cancel??Ref=${vnp_OrderInfo}`);
        }
    },
};

module.exports = PaymentController;
