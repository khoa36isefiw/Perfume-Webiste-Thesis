const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productReviewSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        comment: String,
        rating: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('ProductReview', productReviewSchema);
