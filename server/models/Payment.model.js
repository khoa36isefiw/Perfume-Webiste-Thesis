const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        details: {
            type: String,
        },
        payRef: {
            type: String,
        },
        amount: {
            type: Number,
            required: true,
        },
        paid: {
            type: Boolean,
            default: false,
        },
        paymentMethod: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Payment', paymentSchema);
