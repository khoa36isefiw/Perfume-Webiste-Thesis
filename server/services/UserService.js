const ProductBuyer = require('../models/ProductBuyer.model');
const User = require('../models/User.model');
const Product = require('../models/Product.model');

const UserService = {
    getUserByEmail: async (email) => {
        const user = await User.findOne({ email: email });
        return user;
    },

    getUserById: async (id) => {
        const user = await User.findById(id);
        return user;
    },

    updateUser: async (id, data) => {
        const { password, ...updateData } = data;
        const user = await User.findOne({ _id: id });

        if (!user) {
            throw new Error('User not found');
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        // Update user fields excluding password if not provided
        Object.assign(user, updateData);

        const userUpdated = await user.save();
        return userUpdated;
    },

    checkProductBoughtByUser: async (userId, productId) => {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        const isProductBought = await ProductBuyer.findOne({ user: user._id, product: productId });
        return !!isProductBought;
    },
};

module.exports = UserService;
