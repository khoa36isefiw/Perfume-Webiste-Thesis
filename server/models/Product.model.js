const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: Number,
    image: String,
});

module.exports = mongoose.model('Product', productSchema);
