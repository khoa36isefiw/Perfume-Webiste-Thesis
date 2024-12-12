const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product.model');
const ProductReview = require('../models/ProductReview.model');
const Variant = require('../models/Variant.model');
const emailEvent = require('../events/emailEvent');
const { getDateRange } = require('../utils/date');

const ProductController = {
    getAll: async (req, res) => {
        const { limit, keyword, brand, sortBy, sortOrder = 'asc' } = req.query;
        try {
            const sortDirection = sortOrder === 'asc' ? 1 : -1;

            // Base aggregation pipeline
            const pipeline = [
                {
                    $match: {
                        status: 'active', // Only get active products
                        ...(keyword && {
                            $or: [
                                { nameEn: { $regex: keyword, $options: 'i' } },
                                // Add more fields if needed
                            ],
                        }),
                    },
                },
                {
                    $lookup: {
                        from: 'brands', // Collection name for Brand
                        localField: 'brand', // Field in Product schema
                        foreignField: '_id', // Field in Brand schema
                        as: 'brand', // Name for joined data
                    },
                },
                {
                    $unwind: {
                        path: '$brand',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                // Optional filtering by brandName
                ...(brand
                    ? [
                          {
                              $match: {
                                  'brand.nameEn': { $regex: brand, $options: 'i' },
                              },
                          },
                      ]
                    : []),
                {
                    $lookup: {
                        from: 'categories', // Collection name for Category
                        localField: 'category', // Field in Product schema
                        foreignField: '_id', // Field in Category schema
                        as: 'category', // Name for joined data
                    },
                },
                {
                    $unwind: {
                        path: '$category',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'variants',
                        localField: 'variants',
                        foreignField: '_id',
                        as: 'variants',
                    },
                },
                {
                    $addFields: {
                        minPriceSale: { $min: '$variants.priceSale' }, // Calculates min priceSale from variants
                    },
                },
            ];

            if (sortBy === 'price') {
                pipeline.push({ $sort: { minPriceSale: sortDirection } });
            } else if (sortBy === 'name') {
                pipeline.push({ $sort: { nameEn: sortDirection } });
            }

            if (limit) {
                pipeline.push({ $limit: Number(limit) });
            }

            // Execute the aggregation pipeline
            const products = await Product.aggregate(pipeline);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getLatest: async (req, res) => {
        const limit = req.query.limit || 10;
        try {
            const products = await Product.find({ status: 'active' })
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate('variants')
                .populate('category')
                .populate('brand');
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getTopProductSold: async (req, res) => {
        try {
            const products = await Product.find({ status: 'active' })
                .sort({ unitsSold: -1 })
                .limit(10)
                .populate('variants')
                .populate('category')
                .populate('brand');
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    statisticProduct: async (req, res) => {
        try {
            const { timeframe } = req.query;

            if (!timeframe) {
                return res.status(400).json({ error: 'Timeframe is required' });
            }

            const { startDate, endDate } = getDateRange(timeframe);

            const products = await Product.find({
                createdAt: { $gte: startDate, $lt: endDate },
            });

            res.status(200).json(products.length);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findOne({ _id: id, status: 'active' })
                .populate('variants')
                .populate('category')
                .populate('brand');
            let reviewData = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
            };
            const reviews = await ProductReview.find({ product: id }).populate('user');
            if (reviews.length > 0) {
                reviews.forEach((review) => {
                    reviewData[review.rating] += 1;
                });
            }
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ product, reviewData });
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
        const { nameVn, nameEn, descriptionVn, descriptionEn, variants, content, category, brand } =
            req.body;
        const fileData = req.files;
        const imagePaths = fileData?.length > 0 && fileData.map((item) => item.path);
        try {
            const contentParsed = JSON.parse(content);
            const product = new Product({
                nameVn,
                nameEn,
                descriptionVn,
                descriptionEn,
                imagePath: imagePaths,
                content: contentParsed,
                category,
                brand,
                status: 'active',
            });
            const savedProduct = await product.save();
            const variantParse = JSON.parse(variants);
            const newVariants = variantParse.map((item) => ({
                ...item,
                product: savedProduct._id,
                size: item.size,
                priceSale: !!item.priceSale ? item.priceSale : item.price,
                price: item.price,
                discountPercent: item.priceSale
                    ? Math.round(((item.price - item.priceSale) / item.price) * 100)
                    : 0,
                stock: item.stock,
            }));

            const savedVariants = await Variant.insertMany(newVariants);

            savedProduct.variants = savedVariants.map((variant) => variant._id);

            const result = await savedProduct.save();

            emailEvent.emit('sendEmail', {
                subject: 'New Product Available!',
                content: `Check out our new product: ${nameEn}. Visit our website for more details!`,
            });

            res.status(201).json(result);
        } catch (error) {
            if (fileData) {
                for (const file of fileData) {
                    const publicId = ProductController.extractPublicIdFromURL(file.path);
                    cloudinary.uploader.destroy(publicId, (error, result) => {
                        if (error) {
                            console.error(error);
                        }
                    });
                }
            }
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { variants, deletedImages, ...rest } = req.body;
        console.log(deletedImages);
        const variantParse = JSON.parse(variants);
        const deletedImageURL = JSON.parse(deletedImages);
        const fileData = req.files;
        const imagePaths = fileData?.length > 0 && fileData.map((item) => item.path);
        try {
            const product = await Product.findOne({ _id: id });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await Product.updateOne({ _id: id }, { $set: rest });
            if (deletedImageURL.length > 0) {
                for (const image of deletedImageURL) {
                    const publicId = ProductController.extractPublicIdFromURL(image);
                    await cloudinary.uploader.destroy(publicId);
                    product.imagePath = product.imagePath.filter((item) => item !== image);
                }
            }
            if (imagePaths.length > 0) {
                product.imagePath.push(...imagePaths);
            }
            if (variantParse?.length) {
                const updateVariants = [];
                for (const variant of variantParse) {
                    if (variant._id) {
                        await Variant.updateOne(
                            { _id: variant._id },
                            {
                                $set: {
                                    ...variant,
                                    discountPercent: Math.round(
                                        ((variant.price - variant.priceSale) / variant.price) * 100,
                                    ),
                                },
                            },
                        );
                        updateVariants.push(variant._id);
                    } else {
                        const newVariant = new Variant({
                            ...variant,
                            discountPercent: Math.round(
                                ((variant.price - variant.priceSale) / variant.price) * 100,
                            ),
                            product: id,
                        });
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

    extractPublicIdFromURL: (imageURL) => {
        const urlParts = imageURL.split('/');
        const fileName = urlParts[urlParts.length - 2] + '/' + urlParts[urlParts.length - 1];
        const publicId = fileName.split('.')[0];
        return publicId;
    },
};

module.exports = ProductController;
