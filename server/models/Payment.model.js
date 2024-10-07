const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
    {
        orderId: {
            type: [mongoose.Schema.Types.ObjectId],
            required: true,
        },
        details: {
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
