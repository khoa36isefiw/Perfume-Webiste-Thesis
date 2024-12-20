const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/PaymentController');
const authToken = require('../middlewares/authToken');

// router.post('/vnpay/create-payment-url', paymentController.createVnPayPaymentUrl);
router.get('/vnpay/return', paymentController.vnpayReturn);
router.post('/paypal/capture-order', authToken.authenticationToken, paymentController.captureOrder);
router.post('/create-order', authToken.authenticationToken, paymentController.createOrder);
router.get('/detail/:payRef', paymentController.getByPayRef);
router.get('/:id', paymentController.getById);
router.get('/', paymentController.getAll);

module.exports = router;
