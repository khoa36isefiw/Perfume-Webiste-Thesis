const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema(
    {
        nameVn: {
            type: String,
            required: true,
        },
        nameEn: {
            type: String,
            required: true,
        },
        descriptionVN: String,
        descriptionEN: String,
        thumbnail: String,
        path: String,
        status: String,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Brand', brandSchema);
