const bcrypt = require('bcrypt');
const generator = require('generate-password');
require('dotenv').config();
const User = require('../models/User.model');
const Product = require('../models/Product.model');
const Order = require('../models/Order.model');
const Subscriber = require('../models/Subscriber.model');
const nodemailer = require('nodemailer');
const ProductReview = require('../models/ProductReview.model');
const { checkProductBoughtByUser } = require('../services/UserService');
const { getDateRange } = require('../utils/date');

const UserController = {
    getAll: async (req, res) => {
        const { limit } = req.query;
        try {
            let userQuery = User.find({ status: 'active' });
            if (limit) {
                userQuery = userQuery.limit(Number(limit));
            }
            const users = await userQuery;
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id).populate('cart.product').populate('cart.variant');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    statisticUser: async (req, res) => {
        try {
            const { timeframe } = req.query;

            if (!timeframe) {
                return res.status(400).json({ error: 'Timeframe is required' });
            }

            const { startDate, endDate } = getDateRange(timeframe);

            const users = await User.find({
                createdAt: { $gte: startDate, $lt: endDate },
            });

            res.status(200).json(users.length);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    checkEmailAvailability: async (req, res) => {
        try {
            const { email } = req.body;
            const existentUser = await User.findOne({ email });
            if (!existentUser) {
                res.status(404).json({ message: 'Email not found' });
            }
            res.status(200).json({ message: 'Email available' });
        } catch (error) {
            console.error('Error checking email availability:', error);
            res.status(500).json('Internal Server Error');
        }
    },

    updateProfile: async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const fileData = req.file;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            Object.keys(data).forEach((key) => {
                user[key] = data[key];
            });
            if (fileData) {
                user.imagePath = fileData.path;
            }

            const updatedUser = await user.save();

            return res.status(200).json({
                message: 'Profile updated successfully',
                user: updatedUser,
            });
        } catch (err) {
            return res.status(500).json(`Error updating profile: ${err}`);
        }
    },
    recoverPassword: async (email, password) => {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                const hashPassword = await bcrypt.hash(password, 10);
                const userUpdated = {
                    password: hashPassword,
                };
                await User.updateOne({ _id: user._id }, userUpdated);
                return 'Cập nhật password thành công';
            } else {
                return 'Không tìm thấy user!';
            }
        } catch (err) {
            return `Có lỗi trong quá trình reset password :  ${err}`;
        }
    },

    changePassword: (req, res) => {
        console.log(req);
        User.findOne({ _id: req.params.id })
            .then(async (user) => {
                console.log(user);
                const { newPassword, confirmPassword } = req.body;
                if (newPassword !== confirmPassword) {
                    return res.status(400).json({ message: 'Password does not match' });
                }
                // kiểm tra password người dùng gửi lên
                const hashNewPassword = await bcrypt.hash(confirmPassword, 10);
                await User.updateOne({ _id: user._id }, { password: hashNewPassword });
                const { password, ...others } = user._doc;
                return res.status(200).json(others);
            })
            .catch(() => {
                res.status(500).json('Không tìm thấy người dùng.');
            });
    },
    sendRecoverPassEmail: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (user) {
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                });
                const resetPassword = generator.generate({
                    length: 8,
                    numbers: true,
                });

                const info = await transporter.sendMail({
                    from: `"TOMTOC PERFURMS 👻" <${process.env.EMAIL_USER}>`, // sender address
                    to: email, // list of receivers
                    subject: 'Recover Password', // Subject line
                    text: 'Your password have been reset!', // plain text body
                    html: `<p>Your password is: <b>${resetPassword}</b></p>`, // html body
                });

                if (info) {
                    await UserController.recoverPassword(email, resetPassword);
                    return res.status(200).json(info);
                }
            } else {
                return res.status(404).json({
                    message: 'Email not found',
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    create: async (req, res) => {
        try {
            const {
                email,
                password,
                firstName,
                lastName,
                phoneNumber,
                address,
                gender,
                imagePath = '',
                role = 0,
            } = req.body;
            const existentUser = await User.findOne({ email });
            if (!existentUser) {
                const hashPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                    email,
                    password: hashPassword,
                    firstName,
                    lastName,
                    phoneNumber,
                    address,
                    gender,
                    imagePath,
                    role,
                });
                return res.status(201).json(user);
            } else {
                return res.status(400).json({
                    message: 'Email đã tồn tại!',
                });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const { password, ...rest } = req.body;
            let user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }
            Object.assign(user, rest);

            await user.save();
            return res.status(200).json({
                message: 'User updated successfully',
                user,
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
    },

    delete: (req, res) => {
        const { id } = req.params;
        const user = User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        user.status = 'inactive';
        user.save();
        return res.status(200).json({
            message: 'User deleted successfully',
        });
    },

    destroy: async (req, res) => {
        try {
            const result = await User.deleteOne({ _id: req.params.id });
            if (result.deletedCount === 0) {
                res.status(404).json('Không tìm thấy người dùng.');
            } else {
                res.status(204).json('Xóa vĩnh viễn người dùng thành công.');
            }
        } catch (error) {
            res.status(500).json('Có lỗi khi xóa người dùng');
        }
    },

    addToCart: async (req, res) => {
        try {
            const { id } = req.params; // userId
            const { product, variant, quantity } = req.body;

            const user = await User.findById(id);

            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const existingItemIndex = user.cart.findIndex(
                (cartItem) =>
                    cartItem.product.toString() === product &&
                    cartItem.variant.toString() === variant,
            );

            if (existingItemIndex > -1) {
                user.cart[existingItemIndex].quantity += quantity;
            } else {
                user.cart.push({
                    product: product,
                    variant: variant,
                    quantity: quantity,
                });
            }

            const result = await user.save();

            if (result) {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateCart: async (req, res) => {
        const { id } = req.params;
        const { product, variant, quantity } = req.body;

        try {
            const user = await User.findById(id);

            const cartItemIndex = user.cart.findIndex(
                (cartItem) =>
                    cartItem.product.toString() === product &&
                    cartItem.variant.toString() === variant,
            );

            if (cartItemIndex > -1) {
                if (quantity <= 0) {
                    user.cart.splice(cartItemIndex, 1);
                } else {
                    user.cart[cartItemIndex].quantity = quantity;
                }
                await user.save();
                return res.status(200).json({ message: 'Giỏ hàng đã được cập nhật.' });
            } else {
                return res.status(404).json({ message: 'Sản phẩm không có trong giỏ hàng.' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    removeItemFromCart: async (req, res) => {
        const { id } = req.params;
        const { product, variant } = req.body;

        try {
            const user = await User.findById(id);

            const cartItemIndex = user.cart.findIndex(
                (cartItem) =>
                    cartItem.product.toString() === product &&
                    cartItem.variant.toString() === variant,
            );

            if (cartItemIndex > -1) {
                user.cart.splice(cartItemIndex, 1);
                await user.save();
                return res.status(200).json({ message: 'Item removed from cart.' });
            } else {
                return res.status(404).json({ message: 'Item not found in cart.' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    clearCart: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            user.cart = [];
            await user.save();
            return res.status(200).json({ message: 'Cart cleared.' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    review: async (req, res) => {
        const { userId, productId, orderId, comment, rating } = req.body;
        try {
            const product = await Product.findOne({ _id: productId });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            // check condition if user has been bought product
            const isProductBought = await checkProductBoughtByUser(userId, productId);
            if (!isProductBought) {
                return res.status(400).json({ message: 'You have not bought this product' });
            }
            const newReview = new ProductReview();
            newReview.rating = rating;
            newReview.comment = comment;
            newReview.product = productId;
            newReview.user = userId;
            const savedReview = await newReview.save();

            // Cập nhật isReviewed trong Order
            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            const item = order.items.find((i) => i.product.toString() === productId);
            if (item) {
                item.isReviewed = true;
                await order.save();
            }

            // update product numReview and rating
            product.numReviews += 1;
            const reviews = await ProductReview.find({ product: productId });
            product.rating =
                reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
            await product.save();

            res.status(200).json(savedReview);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    subscribe: async (req, res) => {
        const { email } = req.body;

        if (!email) return res.status(400).json({ message: 'Email is required' });

        try {
            const subscriber = await Subscriber.findOne({ email });
            if (subscriber) return res.status(400).json({ message: 'Email already exists' });
            const newSubscriber = new Subscriber({ email });
            await newSubscriber.save();
            return res.status(201).json({ message: 'Subscribed successfully' });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    },
};

module.exports = UserController;
