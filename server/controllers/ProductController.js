const Product = require('../models/Product.model');

const ProductController = {
    getAll: async (req, res) => {
        try {
            const products = await Product.find({ deleted: false }, null, { lean: true });
            res.status(200).json(products);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findOne({ _id: id });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        const { name, description, price, image } = req.body;
        try {
            const product = await Product.create({
                name,
                description,
                price,
                image,
            });
            res.status(201).json(product);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;
        try {
            const product = await Product.findOne({ _id: id });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await Product.updateOne({ _id: id }, updateData);
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findOne({ _id: id });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await Product.updateOne({ _id: id }, { deleted: true });
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
};

module.exports = ProductController;
