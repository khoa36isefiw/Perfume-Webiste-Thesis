const User = require('../models/User.model');

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
};

module.exports = UserService;
