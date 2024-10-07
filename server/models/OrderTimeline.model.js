const mongoose = require('mongoose');
const { OrderStatus } = require('../utilities/constants');
const Schema = mongoose.Schema;

const orderTimelineSchema = new Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        action: String,
        remarks: String,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('OrderTimeline', orderTimelineSchema);
