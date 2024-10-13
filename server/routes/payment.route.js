const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/PaymentController');

// router.delete('/:id', paymentController.destroy);
router.get('/:id', paymentController.getById);
router.post('/', paymentController.create);
router.get('/', paymentController.getAll);

module.exports = router;
