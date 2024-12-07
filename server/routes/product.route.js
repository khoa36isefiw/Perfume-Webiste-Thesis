const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const uploadCloud = require('../middlewares/uploader');

router.put('/:id/delete', uploadCloud.array('imagePath'), productController.delete);
router.put('/:id', productController.update);
// router.delete('/:id', productController.destroy);
router.get('/brand/:brandId', productController.getByBrandId);
router.get('/category/:categoryId', productController.getByCategoryId);
router.get('/latest', productController.getLatest);
router.get('/:id', productController.getById);
router.post('/', uploadCloud.array('imagePath'), productController.create);
router.get('/', productController.getAll);

module.exports = router;
