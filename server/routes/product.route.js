const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const uploadCloud = require('../middlewares/uploader');

router.get('/lastest-products', productController.getLatest);
router.get('/categories/:category', productController.getByCategory);
router.put('/:id/delete', productController.delete);
router.put('/:id', uploadCloud.single('images'), productController.update);
router.delete('/:id', productController.destroy);
router.get('/:id', productController.getById);
router.post('/', uploadCloud.single('images'), productController.create);
router.get('/', productController.getAll);

module.exports = router;
