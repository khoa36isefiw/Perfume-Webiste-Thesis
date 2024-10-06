const OrderTimeline = require('../models/OrderTimeline.model');

const OrderTimelineController = {
    getAll: async (req, res) => {
        try {
            const orders = await OrderTimeline.find({ deleted: false }, null, { lean: true });
            res.status(200).json(orders);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await OrderTimeline.findOne({ _id: id });
            if (!order) {
                return res.status(404).json({ message: 'OrderTimeline not found' });
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        const { userId } = req.body;
        try {
            const order = await OrderTimeline.create({});
            res.status(201).json(order);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;
        try {
            const order = await OrderTimeline.findOne({ _id: id });
            if (!order) {
                return res.status(404).json({ message: 'OrderTimeline not found' });
            }
            await OrderTimeline.updateOne({ _id: id }, updateData);
            res.status(200).json({ message: 'OrderTimeline updated successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const order = await OrderTimeline.findOne({ _id: id });
            if (!order) {
                return res.status(404).json({ message: 'OrderTimeline not found' });
            }
            await OrderTimeline.updateOne({ _id: id }, { deleted: true });
            res.status(200).json({ message: 'OrderTimeline deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
};

module.exports = OrderTimelineController;
