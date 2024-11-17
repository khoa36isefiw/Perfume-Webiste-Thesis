const ProductReview = require('../models/ProductReview.model');

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
