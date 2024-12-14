const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        nameVn: {
            type: String,
            required: true,
        },
        nameEn: {
            type: String,
            required: true,
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        descriptionVn: String,
        descriptionEn: String,
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Category', categorySchema);
