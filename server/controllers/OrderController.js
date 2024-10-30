const Order = require('../models/Order.model');
const Product = require('../models/Product.model');
const Variant = require('../models/Variant.model');

const OrderController = {
    getAll: async (req, res) => {
        try {
            const orders = await Order.find({});
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const orders = await Order.find({ user: userId });
            if (!orders) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Order.findOne({ _id: id });
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
};

module.exports = OrderController;
