const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotionSchema = new Schema(
    {
        nameVn: {
            type: String,
            required: true,
        },
        nameEn: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        description: String,
        quantity: Number,
        discount: Number,
        startDate: Date,
        endDate: Date,
        status: String,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Promotion', promotionSchema);
