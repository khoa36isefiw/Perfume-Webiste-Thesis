const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const nodemailer = require('nodemailer');
require('dotenv').config();
const generator = require('generate-password');

const UserController = {
    getAll: async (req, res) => {
        const { limit } = req.query;
        try {
            let userQuery = Product.find({ status: 'active' });
            if (limit) {
                userQuery = userQuery.limit(Number(limit));
            }
            const users = await userQuery;
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: (req, res) => {
        User.findOne({ _id: req.params.id })
            .then((user) => {
                res.status(200).json(user);
            })
            .catch(() => {
                res.status(404).json({
                    message: 'User not found',
                });
            });
    },
    checkEmailAvailability: async (req, res) => {
        try {
            const { email } = req.query;
            const existentUser = await User.findOne({ email });

            if (!existentUser) {
                res.status(200).json({ available: true });
            } else {
                res.status(200).json({ available: false });
            }
        } catch (error) {
            console.error('Error checking email availability:', error);
            res.status(500).json('Internal Server Error');
        }
    },

    updateProfile: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findOne({ _id: id });
            if (user) {
                await User.updateOne({ _id: id }, req.body);
                return res.status(200).json('Cập nhật profile thành công');
            } else {
                return res.status(404).json({
                    message: 'Không tìm thấy user!',
                });
            }
        } catch (err) {
            return res.status(400).json(`Có lỗi trong quá trình cập nhật profile :  ${err}`);
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
            console.log(email);
            if (email) {
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
                    from: `"GIMME SHOES 👻" <${process.env.EMAIL_USER}>`, // sender address
                    to: email, // list of receivers
                    subject: 'Recover Password', // Subject line
                    text: 'Your password have been reset!', // plain text body
                    html: `<p>Your password is: <b>${resetPassword}</b></p>`, // html body
                });

                if (info) {
                    await UserController.recoverPassword(email, resetPassword);
                    return res.status(200).json(info);
                }
            }
            return res.status(500).json('Có lỗi rồi !');
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
            return res.status(400).json({ message: err.message });
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
        User.findOne({ _id: req.params.id })
            .then((user) => {
                User.updateOne({ _id: user._id }, req.body)
                    .then(() => {
                        res.status(204).json('Xóa người dùng thành công.');
                    })
                    .catch((err) => {
                        res.status(500).json('Có lỗi khi xóa người dùng.');
                    });
            })
            .catch(() => {
                res.status(404).json('Không tìm thấy người dùng.');
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
};

module.exports = UserController;
