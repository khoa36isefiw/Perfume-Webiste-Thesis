const User = require('../models/User.model');

const AuthService = {
    register: async (data) => {
        const user = await User.create(data);
        return user;
    },

    // Tạo accessToken
    generateAccessToken: (user) => {
        const accessToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '2h' },
        );
        return accessToken;
    },
    // Tạo refreshToken
    generateRefreshToken: (user) => {
        const refreshToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' },
        );
        return refreshToken;
    },
};

module.exports = AuthService;
