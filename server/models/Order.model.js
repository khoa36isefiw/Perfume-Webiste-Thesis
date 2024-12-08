const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        variant: {
            type: Schema.Types.ObjectId,
            ref: 'Variant',
            required: true,
        },
        category: String,
        brand: String,
        productName: String,
        image: [String],
        size: String,
        price: {
            type: Number,
            required: true,
        },
        priceSale: {
            type: Number,
        },
        discountedPrice: {
            type: Number,
        },
        quantity: {
            type: Number,
            required: true,
        },
        isReviewed: {
            type: Boolean,
            default: false,
        },
    },
    { _id: false },
);

const orderSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [orderItemSchema],
        totalPrice: {
            type: Number,
            required: true,
        },
        originalTotalPrice: {
            type: Number,
        },
        adjustedTotalPrice: {
            type: Number,
        },
        email: String,
        address: String,
        phoneNumber: String,
        paymentMethod: String,
        promotionCode: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Promotion',
        },
        status: {
            type: String,
            enum: ['PENDING_PAYMENT', 'PAID', 'CANCELLED'],
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Order', orderSchema);
