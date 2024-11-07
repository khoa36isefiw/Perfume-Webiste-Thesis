const Category = require('../models/Category.model');

const CategoryController = {
    getAll: async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getParentCategory: async (req, res) => {
        try {
            const parentCategory = await Category.find({ parent: null });
            res.status(200).json(parentCategory);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getChildByPId: async (req, res) => {
        try {
            const childrenCategory = await Category.find({ parent: req.params.id });
            res.status(200).json(childrenCategory);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const category = await Category.findOne({ _id: req.params.id });
            if (!category) {
                res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            let parentId = req.body.parentId;
            if (!parentId) parentId = null;
            const category = new Category({
                ...req.body,
                parent: parentId,
            });
            await category.save();
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const category = await Category.findOne({ _id: req.params.id });
            if (!category) {
                res.status(404).json({ message: 'Category not found' });
            }
            await category.updateOne(req.body);
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const category = await Category.findOne({ _id: req.params.id });
            if (!category) {
                res.status(404).json({ message: 'Category not found' });
            }
            await category.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    destroy: async (req, res) => {
        try {
            const result = await Category.deleteOne({ _id: req.params.id });
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

module.exports = CategoryController;
