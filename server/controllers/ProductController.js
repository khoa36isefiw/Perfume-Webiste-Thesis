const Product = require('../models/Product.model');
const Variant = require('../models/Variant.model');

const ProductController = {
    getAll: async (req, res) => {
        const { limit } = req.query;
        try {
            const queryOptions = {
                lean: true,
            };
            let productsQuery = Product.find({ status: 'active' }, null, queryOptions)
                .populate('variants')
                .populate('category')
                .populate('brand');
            if (limit) {
                productsQuery = productsQuery.limit(Number(limit));
            }
            const products = await productsQuery;
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findOne({ _id: id })
                .populate('variants')
                .populate('category')
                .populate('brand');
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getByCategoryId: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const products = await Product.find({ category: categoryId, status: 'active' })
                .populate('variants')
                .populate('category')
                .populate('brand');
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getByBrandId: async (req, res) => {
        try {
            const { brandId } = req.params;
            const products = await Product.find({ brand: brandId, status: 'active' })
                .populate('variants')
                .populate('category')
                .populate('brand');
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        const {
            nameVn,
            nameEn,
            descriptionVn,
            descriptionEn,
            variants,
            content,
            imagePath,
            category,
            brand,
        } = req.body;
        try {
            const product = new Product({
                nameVn,
                nameEn,
                descriptionVn,
                descriptionEn,
                imagePath,
                content,
                category,
                brand,
                status: 'active',
            });
            const savedProduct = await product.save();
            const newVariants = variants.map((item) => ({
                ...item,
                product: savedProduct._id,
                size: item.size,
                priceSale: item.priceSale ? item.priceSale : item.price,
                price: item.price,
                stock: item.stock,
            }));
            const savedVariants = await Variant.insertMany(newVariants);

            savedProduct.variants = savedVariants.map((variant) => variant._id);

            const result = await savedProduct.save();
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { variants, ...rest } = req.body;
        try {
            const product = await Product.findOne({ _id: id });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await Product.updateOne({ _id: id }, { $set: rest });

            if (variants?.length) {
                const updateVariants = [];
                for (const variant of variants) {
                    if (variant._id) {
                        await Variant.updateOne({ _id: variant._id }, { $set: variant });
                        updateVariants.push(variant._id);
                    } else {
                        const newVariant = new Variant({ ...variant, productId: id });
                        const savedVariant = await newVariant.save();
                        updateVariants.push(savedVariant._id);
                    }
                }
                // delete old variants
                for (const oldVariant of product.variants) {
                    if (!updateVariants.includes(oldVariant._id.toString())) {
                        console.log(oldVariant);
                        await Variant.deleteOne({ _id: oldVariant._id });
                    }
                }
                product.variants = updateVariants;
                await product.save();
            }
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findOne({ _id: id });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await Product.updateOne({ _id: id }, { status: 'inactive' });
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = ProductController;
