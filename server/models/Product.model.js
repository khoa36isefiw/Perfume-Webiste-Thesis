const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        nameVn: {
            type: String,
            required: true,
        },
        nameEn: {
            type: String,
            required: true,
        },
        descriptionVn: String,
        descriptionEn: String,
        price: Number,
        priceSale: Number,
        imagePath: String,
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            default: null,
        },
        brandId: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
            default: null,
        },
        size: String,
        countInStock: Number,
        rating: Number,
        numReviews: Number,
        status: String,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Product', productSchema);
