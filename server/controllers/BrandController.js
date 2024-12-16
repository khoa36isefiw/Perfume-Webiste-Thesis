const Brand = require('../models/Brand.model');

const BrandController = {
    getAll: async (req, res) => {
        try {
            const brands = await Brand.find();
            res.status(200).json(brands);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const brand = await Brand.findOne({ _id: id });

            if (!brand) {
                res.status(404).json({ message: 'Brand not found' });
            }
            res.status(200).json(brand);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const brand = new Brand(req.body);
            await brand.save();
            res.status(201).json(brand);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const brand = await Brand.findOne({ _id: id });
            if (!brand) {
                res.status(404).json({ message: 'Brand not found' });
            }

            const updatedBrand = await Brand.updateOne({ _id: id }, updateData);
            res.status(200).json(updatedBrand);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const brand = await Brand.findOne({ _id: req.params.id });
            if (!brand) {
                res.status(404).json({ message: 'Brand not found' });
            }
            brand.status = 'inactive';
            await brand.save();
            res.status(200).json({ message: 'Brand deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    destroy: async (req, res) => {
        try {
            const result = await Brand.deleteOne({ _id: req.params.id });
            if (result.deletedCount === 0) {
                res.status(404).json('Không tìm thấy danh mục.');
            } else {
                res.status(204).json('Xóa vĩnh viễn danh mục thành công.');
            }
        } catch (error) {
            res.status(500).json('Có lỗi khi xóa danh mục');
        }
    },
};

module.exports = BrandController;
