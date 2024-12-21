const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const uploadCloud = require('../middlewares/uploader');
const authToken = require('../middlewares/authToken');

router.put(
    '/:id/delete',
    authToken.verifyTokenAdmin,
    uploadCloud.array('imagePath'),
    productController.delete,
);
router.put(
    '/:id',
    authToken.verifyTokenAdmin,
    uploadCloud.array('imagePath'),
    productController.update,
);
// router.delete('/:id', productController.destroy);
router.get('/brand/:brandId', productController.getByBrandId);
router.get('/category/:categoryId', productController.getByCategoryId);
router.get('/latest', productController.getLatest);
router.get('/:id', productController.getById);
router.post(
    '/',
    authToken.verifyTokenAdmin,
    uploadCloud.array('imagePath'),
    productController.create,
);
router.get('/', productController.getAll);

module.exports = router;
