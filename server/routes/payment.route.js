const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/PaymentController');

router.post('/capture-order', paymentController.captureOrder);
router.post('/create-order', paymentController.createOrder);
// router.get('/', paymentController.getAll);

module.exports = router;
