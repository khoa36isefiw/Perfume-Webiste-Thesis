const Order = require('../models/Order.model');
const Product = require('../models/Product.model');
const Variant = require('../models/Variant.model');
const Payment = require('../models/Payment.model');
const { getDateRange } = require('../utils/date');

const OrderController = {
    getAll: async (req, res) => {
        try {
            const orders = await Order.find({}).populate('promotionCode').populate('user');
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    statisticOrder: async (req, res) => {
        try {
            const { timeframe } = req.query;

            if (!timeframe) {
                return res.status(400).json({ error: 'Timeframe is required' });
            }

            const { startDate, endDate } = getDateRange(timeframe);

            const orders = await Order.find({
                createdAt: { $gte: startDate, $lt: endDate },
            })
                .populate('promotionCode')
                .populate('user');

            res.status(200).json(orders.length);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    statisticRevenue: async (req, res) => {
        try {
            const { year } = req.query;

            // Validate year input
            if (!year || isNaN(year)) {
                return res.status(400).json({ error: 'Valid year is required' });
            }

            // Query to get orders grouped by month
            const revenueStats = await Order.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(`${year}-01-01`),
                            $lte: new Date(`${year}-12-31`),
                        },
                    },
                },
                {
                    $group: {
                        _id: { $month: '$createdAt' },
                        totalRevenue: { $sum: '$originalTotalPrice' }, // Replace "totalValue" with the appropriate field
                    },
                },
                {
                    $sort: { _id: 1 }, // Sort by month
                },
            ]);

            // Format result
            const formattedResult = Array.from({ length: 12 }, (_, i) => {
                const month = i + 1;
                const stat = revenueStats.find((s) => s._id === month);
                return {
                    month,
                    totalRevenue: stat ? stat.totalRevenue : 0,
                };
            });

            return res.status(200).json({ year, revenueByMonth: formattedResult });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const orders = await Order.find({ user: userId })
                .populate('promotionCode')
                .populate('user');
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Order.findOne({ _id: id })
                .populate('promotionCode')
                .populate('user');
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        const { user, items } = req.body;
        try {
            const newOrder = new Order({
                user,
                status: 'PENDING_PAYMENT',
                totalPrice: 0,
            });

            if (items.length) {
                for (const item of items) {
                    const product = await Product.findOne({ _id: item.product });
                    const variant = await Variant.findOne({ _id: item.variant });
                    newOrder.items.push({
                        product: product._id,
                        variant: variant._id,
                        productName: product.nameEn,
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
            }
            const order = await newOrder.save();
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    cancelOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Order.findById(id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            order.status = 'CANCELLED';
            await order.save();
            res.status(200).json({ message: 'Order cancelled' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    completeOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Order.findById(id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            if (order.paymentMethod !== 'COD') {
                return res.status(400).json({ message: 'Payment method is invalid' });
            }
            const payment = await Payment.findOne({ payRef: id });
            if (payment) {
                payment.paid = true;
                await payment.save();
            }
            order.status = 'PAID';
            await order.save();
            res.status(200).json({ message: 'Order completed' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = OrderController;
