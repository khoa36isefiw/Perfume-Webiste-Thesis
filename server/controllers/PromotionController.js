const emailEvent = require('../events/emailEvent');
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
            res.status(500).json({ message: error.message });
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
            res.status(500).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { discount, code, startDate, endDate, quantity, ...rest } = req.body;
            const promotionExists = await Promotion.findOne({ code: code });
            if (promotionExists) {
                return res.status(400).json({ message: 'Promotion code already exists' });
            }
            if (discount < 0 || discount > 100) {
                return res.status(400).json({ message: 'Discount must be between 0 and 100' });
            }
            if (startDate > endDate) {
                return res.status(400).json({ message: 'Start date must be before end date' });
            }
            if (quantity <= 0) {
                return res.status(400).json({ message: 'Quantity must be greater than 0' });
            }
            const promotion = await Promotion.create({
                discount,
                code,
                startDate,
                endDate,
                quantity,
                ...rest,
            });

            emailEvent.emit('sendEmail', {
                subject: 'New Promotion Code!',
                content: `We have a new promotion code: ${promotion.code} with a ${discount}% discount. Don't miss out!`,
            });

            res.status(201).json(promotion);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { discount, ...rest } = req.body;
        try {
            const promotion = await Promotion.findOne({ _id: id });
            if (!promotion) {
                return res.status(404).json({ message: 'Promotion not found' });
            }
            if (discount < 0 || discount > 100) {
                return res.status(400).json({ message: 'Discount must be between 0 and 100' });
            }
            await Promotion.updateOne({ _id: id }, { discount, ...rest });
            res.status(200).json({ message: 'Promotion updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
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
            res.status(500).json({ message: error.message });
        }
    },

    apply: async (req, res) => {
        const { code } = req.body;
        try {
            const promotion = await Promotion.findOne({ code: code, status: 'active' });
            if (!promotion) {
                return res.status(404).json({ message: 'Promotion not found' });
            }
            if (promotion.quantity <= 0) {
                return res.status(400).json({ message: 'Promotion is out of stock' });
            }
            if (promotion.endDate < new Date()) {
                return res.status(400).json({ message: 'Promotion has expired' });
            }
            res.status(200).json({
                message: 'Promotion applied successfully',
                promotion: promotion,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = PromotionController;
