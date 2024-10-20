const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const variantSchema = Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    size: {
        type: String,
        enum: ['9ml', '25ml', '27ml', '50ml', '65ml', '100ml'],
        required: true,
    },
    priceSale: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Variant', variantSchema);
