const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const orderController = require('../controllers/OrderController');
const productController = require('../controllers/ProductController');
const reviewController = require('../controllers/ProductReviewController');

router.get('/user', userController.statisticUser);
router.get('/order', orderController.statisticOrder);
router.get('/product', productController.statisticProduct);
router.get('/review', reviewController.statisticReview);

module.exports = router;
