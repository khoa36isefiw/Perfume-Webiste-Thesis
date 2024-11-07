const Promotion = require('../models/Promotion.model');

const PromotionController = {
    getAll: async (req, res) => {
        try {
            const { status } = req.query;
            if (!status) {
                const promotions = await Promotion.find();
                return res.status(200).json(promotions);
            }
            const promotions = await Promotion.find({ status: status });
            res.status(200).json(promotions);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const promotion = await Promotion.findOne({ _id: id });
            if (!promotion) {
                return res.status(404).json({ message: 'Promotion not found' });
            }
            res.status(200).json(promotion);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { discount } = req.body;
            if (discount < 0 || discount > 100) {
                return res.status(400).json({ message: 'Discount must be between 0 and 100' });
            }
            const promotion = await Promotion.create(req.body);
            res.status(201).json(promotion);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;
        try {
            const promotion = await Promotion.findOne({ _id: id });
            if (!promotion) {
                return res.status(404).json({ message: 'Promotion not found' });
            }
            await Promotion.updateOne({ _id: id }, updateData);
            res.status(200).json({ message: 'Promotion updated successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const promotion = await Promotion.findOne({ _id: id });
            if (!promotion) {
                return res.status(404).json({ message: 'Promotion not found' });
            }
            await Promotion.updateOne({ _id: id }, { status: 'inactive' });
            res.status(200).json({ message: 'Promotion deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
};

module.exports = PromotionController;
