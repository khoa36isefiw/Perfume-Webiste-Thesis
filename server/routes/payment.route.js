const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/PaymentController');

router.post('/paypal/capture-order', paymentController.captureOrder);
router.post('/paypal/create-order', paymentController.createOrder);
router.get('/paypal/:payRef', paymentController.getByPayRef);
router.get('/:id', paymentController.getById);
router.get('/', paymentController.getAll);

module.exports = router;
