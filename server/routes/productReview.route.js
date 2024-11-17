const express = require('express');
const router = express.Router();

const productReviewController = require('../controllers/ProductReviewController');

router.get('/product/:productId', productReviewController.getByProductId);
router.get('/user/:userId', productReviewController.getByUserId);
router.get('/', productReviewController.getAll);

module.exports = router;
