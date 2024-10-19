const mongoose = require('mongoose');
const { OrderStatus } = require('../utilities/constants');
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
            enum: Object.values(OrderStatus),
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Order', orderSchema);
