const Category = require('../models/Category.model');

const CategoryController = {
    getAll: (req, res) => {
        Category.find({})
            .then((categories) => res.status(200).json(categories))
            .catch(() => res.status(404).json('Không tìm thấy danh sách danh mục.'));
    },

    getParentCategory: (req, res) => {
        Category.find({ parentId: null })
            .then((categories) => res.status(200).json(categories))
            .catch(() => res.status(404).json('Không tìm thấy danh sách danh mục.'));
    },

    getChildByPId: (req, res) => {
        Category.findOne({ _id: req.params.id })
            .then((category) => {
                Category.find({ parentId: category._id })
                    .then((categories) => res.status(200).json(categories))
                    .catch(() => res.status(404).json('Không tìm thấy danh sách danh con.'));
            })
            .catch(() => {
                res.status(404).json('Không tìm thấy danh mục.');
            });
    },

    getById: (req, res) => {
        Category.findOne({ _id: req.params.id })
            .then((category) => {
                res.json(category);
            })
            .catch(() => {
                res.status(404).json('Không tìm thấy danh mục.');
            });
    },

    create: (req, res) => {
        let parentId = req.body.parentId;

        if (!parentId) parentId = null;
        const category = new Category({
            ...req.body,
            parentId: parentId,
        });
        try {
            category.save();
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json('Xảy ra lỗi trong quá trình tạo danh mục.');
        }
    },

    update: (req, res) => {
        Category.findOne({ _id: req.params.id })
            .then((category) => {
                Category.updateOne({ _id: category._id }, req.body)
                    .then(() => {
                        res.status(200).json('Cập nhật danh mục thành công.');
                    })
                    .catch((err) => {
                        res.status(500).json('Có lỗi xảy ra trong quá trình cập nhật danh mục.');
                    });
            })
            .catch(() => {
                res.status(404).json('Không tìm thấy danh mục.');
            });
    },

    delete: (req, res) => {
        Category.findOne({ _id: req.params.id })
            .then((category) => {
                Category.updateOne({ _id: category._id }, req.body)
                    .then(() => {
                        res.status(204).json('Xóa danh mục thành công.');
                    })
                    .catch((err) => {
                        res.status(500).json('Có lỗi khi xóa danh mục.');
                    });
            })
            .catch(() => {
                res.status(404).json('Không tìm thấy danh mục.');
            });
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
