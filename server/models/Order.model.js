const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: {
            type: [Object],
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        originalPrice: {
            type: Number,
        },
        adjustedPrice: {
            type: Number,
        },
        email: String,
        address: String,
        phoneNumber: String,
        paymentMethod: String,
        status: {
            type: String,
            enum: ['PENDING_PAYMENT', 'PAID', 'IN_SHOPPING_CART', 'CANCELLED'],
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Order', orderSchema);
