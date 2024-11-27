const ProductReview = require('../models/ProductReview.model');
const { getDateRange } = require('../utils/date');

const ProductReviewController = {
    getAll: async (req, res) => {
        try {
            const productReviews = await ProductReview.find({})
                .populate('user')
                .populate('product');
            res.status(200).json(productReviews);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    statisticReview: async (req, res) => {
        try {
            const { timeframe } = req.query;

            if (!timeframe) {
                return res.status(400).json({ error: 'Timeframe is required' });
            }

            const { startDate, endDate } = getDateRange(timeframe);

            const reviews = await ProductReview.find({
                createdAt: { $gte: startDate, $lt: endDate },
            });

            res.status(200).json(reviews.length);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    getByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const productReviews = await ProductReview.find({ user: userId })
                .populate('user')
                .populate('product');
            res.status(200).json(productReviews);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getByProductId: async (req, res) => {
        try {
            const { productId } = req.params;
            const productReviews = await ProductReview.find({ product: productId })
                .populate('user')
                .populate('product');
            res.status(200).json(productReviews);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = ProductReviewController;
