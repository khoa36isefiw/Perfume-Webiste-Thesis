const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/PaymentController');

router.post('/capture-order', paymentController.captureOrder);
router.post('/create-order', paymentController.createOrder);
router.get('/payment-ref/:payRef', paymentController.getByPayRef);
router.get('/:id', paymentController.getById);
router.get('/', paymentController.getAll);

module.exports = router;
