const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.get('/user/:userId', orderController.getByUserId); // get user's list of orders
router.get('/:id', orderController.getById);
router.post('/:id/cancel', orderController.cancelOrder);
router.post('/:id/complete', orderController.completeOrder);
router.post('/', orderController.create);
router.get('/', orderController.getAll);

module.exports = router;
