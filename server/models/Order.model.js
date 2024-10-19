const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        productName: String,
        image: String,
        size: String,
        price: {
            type: Number,
            required: true,
        },
        priceSale: {
            type: Number,
        },
        quantity: {
            type: Number,
            required: true,
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
