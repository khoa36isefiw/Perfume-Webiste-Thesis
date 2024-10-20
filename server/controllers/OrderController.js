const Order = require('../models/Order.model');

const OrderController = {
    getAll: async (req, res) => {
        try {
            const orders = await Order.find({ deleted: false }, null, { lean: true });
            res.status(200).json(orders);
        } catch (error) {
            res.status(404).json({ message: error.message });
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
            res.status(404).json({ message: error.message });
        }
    },

    getByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const orders = await Order.find({ userId }, null, { lean: true });
            res.status(200).json(orders);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        const { userId, item } = req.body;
        try {
            const newOrder = new Order({
                userId,
                status: 'IN_SHOPPING_CART',
            });
            if (!!item) {
                const product = await Product.findOne({ _id: item.productId });
                const variant = await Variant.findOne({ _id: item.variantId });
                newOrder.item = {
                    productId: product._id,
                    productName: product.nameEn,
                    imagePath: product.imagePath,
                    size: variant.size,
                    price: variant.price,
                    priceSale: variant.priceSale,
                    quantity: item.quantity,
                };
                const totalPrice = (newOrder.item.priceSale ?? newOrder.item.price) * item.quantity;
                newOrder.totalPrice = totalPrice;
            }
            const order = await newOrder.save();
            res.status(201).json(order);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { item } = req.body;
        try {
            const order = await Order.findOne({ _id: id });
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            await Order.updateOne(
                { _id: order._id },
                {
                    status: 'IN_SHOPPING_CART',
                    item,
                    totalPrice: item.quantity * product.price,
                },
            );
            res.status(200).json({ message: 'Order updated successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const order = await Order.findOne({ _id: id });
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            await Order.updateOne({ _id: id }, { deleted: true });
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
};

module.exports = OrderController;
