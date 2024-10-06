const Brand = require('../models/Brand.model');

const BrandController = {
    getAll: (req, res) => {
        Brand.find({})
            .then((brands) => res.status(200).json(brands))
            .catch(() => res.status(404).json('Không tìm thấy danh sách danh mục.'));
    },

    getById: (req, res) => {
        Brand.findOne({ _id: req.params.id })
            .then((brand) => {
                res.status(200).json(brand);
            })
            .catch(() => {
                res.status(404).json('Không tìm thấy danh mục.');
            });
    },

    create: (req, res) => {
        const brand = new Brand(req.body);
        try {
            brand.save();
            res.status(201).json(brand);
        } catch (error) {
            res.status(500).json('Xảy ra lỗi trong quá trình tạo danh mục.');
        }
    },

    update: (req, res) => {
        Brand.findOne({ _id: req.params.id })
            .then((brand) => {
                brand
                    .updateOne({ _id: brand._id }, req.body)
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
        Brand.findOne({ _id: req.params.id })
            .then((brand) => {
                brand
                    .updateOne({ _id: brand._id }, req.body)
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
