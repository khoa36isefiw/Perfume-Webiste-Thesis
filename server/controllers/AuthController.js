require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_KEY);

const AuthController = {
    register: async (req, res) => {
        try {
            const { email, firstName, lastName, password, phoneNumber, imagePath } = req.body;
            const existentUser = await User.findOne({ email });
            if (!existentUser) {
                const hashPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                    email,
                    firstName,
                    lastName,
                    password: hashPassword,
                    phoneNumber,
                    imagePath,
                });
                return res.status(200).json(user);
            } else {
                return res.status(400).json({
                    message: 'Email has already been registered',
                });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    // Tạo accessToken
    generateAccessToken: (user) => {
        const accessToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                isAdmin: user.role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '24h' },
        );
        return accessToken;
    },
    // Tạo refreshToken
    generateRefreshToken: (user) => {
        const refreshToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                isAdmin: user.role,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' },
        );
        return refreshToken;
    },

    // Đăng nhập
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log('req.body: ', req.body);
            const user = await User.findOne({ email: email });
            if (!user) return res.status(404).json({ message: 'User not found' });

            // Tìm thấy tài khoản, so sánh mật khẩu
            const isSamePassword = bcrypt.compareSync(password, user.password);
            if (isSamePassword) {
                const accessToken = AuthController.generateAccessToken(user);
                user.accessToken = accessToken;
                const refreshToken = AuthController.generateRefreshToken(user);
                user.refreshTokens.push(refreshToken);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                });

                await User.updateOne({ _id: user._id }, user);
                const { password, ...others } = user._doc;
                return res.status(200).json(others);
            } else {
                return res.status(401).json({ message: 'Wrong password' });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    refreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) res.status(401).json('Unauthorized error!');

        const { email } = req.body;
        const user = await User.findOne({ email: email });

        if (!user.refreshTokens.includes(refreshToken)) res.status(403).json('Forbidden action!');
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            console.log(user);
            if (err) {
                res.status(403).json('Forbidden error!');
            }
            const newAccessToken = AuthController.generateAccessToken(user);
            user.accessToken = newAccessToken;
            const newRefreshToken = AuthController.generateRefreshToken(user);
            user.refreshTokens.push(newRefreshToken);
            await User.updateOne({ _id: user._id }, user);
            const { password, ...others } = user._doc;
            return res.status(200).json(others);
        });
    },

    logout: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.accessToken = '';
            user.refreshTokens = [];
            await User.updateOne({ _id: user._id }, user);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    verifyGoogleToken: async (token) => {
        try {
            // Verify the Google token (e.g., using Google's OAuth2 API)
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_KEY,
            });

            const payload = ticket.getPayload();
            return payload;
        } catch (error) {
            console.error('Google login error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    googleCallback: async (req, res) => {
        console.log('req.user: ', req.body);
        const { token } = req.body;
        const payload = await AuthController.verifyGoogleToken(token);
        console.log('payload: ', payload);
        const { email, sub, picture, given_name, family_name } = payload;
        const user = await User.findOne({ email: email });
        if (!user) {
            const newUser = new User({
                googleId: sub,
                email: email,
                firstName: given_name,
                lastName: family_name,
                imagePath: picture,
                password: '',
            });
            newUser.accessToken = AuthController.generateAccessToken(newUser);
            await newUser.save();
            return res.status(200).json(newUser);
        }
        user.accessToken = AuthController.generateAccessToken(user);
        await user.save();
        return res.status(200).json(user);
    },
};

module.exports = AuthController;
