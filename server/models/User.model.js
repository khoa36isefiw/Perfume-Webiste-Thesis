const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
            type: Boolean,
            default: 0,
        },
        gender: String,
        address: Object,
        phoneNumber: String,
        imagePath: String,
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
        status: String,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', userSchema);
