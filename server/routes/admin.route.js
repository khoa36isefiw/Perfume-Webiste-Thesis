const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const orderController = require('../controllers/OrderController');
const productController = require('../controllers/ProductController');
const reviewController = require('../controllers/ProductReviewController');
const paymentController = require('../controllers/PaymentController');

router.get('/user', userController.statisticUser);
router.get('/order', orderController.statisticOrder);
router.get('/product', productController.statisticProduct);
router.get('/review', reviewController.statisticReview);
router.get('/revenue', orderController.statisticRevenue);
router.get('/recent-transaction', paymentController.getLatestPayments);
router.get('/recent-product', productController.getLatest);
router.get('/top-product-sold', productController.getTopProductSold);
module.exports = router;
