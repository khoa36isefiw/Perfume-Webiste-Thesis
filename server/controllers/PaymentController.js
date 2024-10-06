const Payment = require('../models/Payment.model');

const PaymentController = {
    getAll: async (req, res) => {
        try {
            const orders = await Payment.find({ deleted: false }, null, { lean: true });
            res.status(200).json(orders);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Payment.findOne({ _id: id });
            if (!order) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        const { userId } = req.body;
        try {
            const order = await Payment.create({});
            res.status(201).json(order);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;
        try {
            const order = await Payment.findOne({ _id: id });
            if (!order) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            await Payment.updateOne({ _id: id }, updateData);
            res.status(200).json({ message: 'Payment updated successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const order = await Payment.findOne({ _id: id });
            if (!order) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            await Payment.updateOne({ _id: id }, { deleted: true });
            res.status(200).json({ message: 'Payment deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
};

module.exports = PaymentController;
