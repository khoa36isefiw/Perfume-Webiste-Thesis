const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/PaymentController');

// router.post('/vnpay/create-payment-url', paymentController.createVnPayPaymentUrl);
router.get('/vnpay/return', paymentController.vnpayReturn);
router.post('/paypal/capture-order', paymentController.captureOrder);
router.post('/create-order', paymentController.createOrder);
router.get('/detail/:payRef', paymentController.getByPayRef);
router.get('/:id', paymentController.getById);
router.get('/', paymentController.getAll);

module.exports = router;
