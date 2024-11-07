const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotionSchema = new Schema(
    {
        nameVn: {
            type: String,
        },
        nameEn: {
            type: String,
        },
        code: {
            type: String,
            required: true,
        },
        description: String,
        quantity: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
        startDate: Date,
        endDate: Date,
        status: {
            type: String,
            enum: ['active', 'inactive', 'expired'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Promotion', promotionSchema);
