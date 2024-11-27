const mongoose = require('mongoose');

// Mô hình Subscriber
const subscriberSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Subscriber', subscriberSchema);
