const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const orderController = require('../controllers/OrderController');
const productController = require('../controllers/ProductController');
const reviewController = require('../controllers/ProductReviewController');
const paymentController = require('../controllers/PaymentController');
const authToken = require('../middlewares/authToken');

router.get('/user', authToken.verifyTokenAdmin, userController.statisticUser);
router.get('/order', authToken.verifyTokenAdmin, orderController.statisticOrder);
router.get('/product', authToken.verifyTokenAdmin, productController.statisticProduct);
router.get('/review', authToken.verifyTokenAdmin, reviewController.statisticReview);
router.get('/revenue', authToken.verifyTokenAdmin, orderController.statisticRevenue);
router.get('/recent-transaction', authToken.verifyTokenAdmin, paymentController.getLatestPayments);
router.get('/recent-product', authToken.verifyTokenAdmin, productController.getLatest);
router.get('/top-product-sold', authToken.verifyTokenAdmin, productController.getTopProductSold);
module.exports = router;
