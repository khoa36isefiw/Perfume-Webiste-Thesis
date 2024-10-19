const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        variant: {
            type: Schema.Types.ObjectId,
            ref: 'Variant',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
    },
    { _id: false },
);

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: String,
        lastName: String,
        role: {
            type: Number,
            default: 0,
        },
        gender: String,
        address: Object,
        phoneNumber: String,
        imagePath: String,
        cart: [cartItemSchema],
        accessToken: {
            type: String,
            default: '',
        },
        refreshTokens: [
            {
                type: String,
                default: '',
            },
        ],
        status: {
            type: String,
            default: 'active',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', userSchema);
