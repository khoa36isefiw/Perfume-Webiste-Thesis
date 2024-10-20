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
        thumbnail: String,
        path: String,
        status: String,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Category', categorySchema);
