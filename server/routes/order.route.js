const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const authToken = require('../middlewares/authToken');

router.get('/user/:userId', orderController.getByUserId); // get user's list of orders
router.get('/:id', orderController.getById);
router.post('/:id/cancel', authToken.verifyTokenAdmin, orderController.cancelOrder);
router.post('/:id/complete', authToken.verifyTokenAdmin, orderController.completeOrder);
router.post('/', authToken.verifyTokenAdmin, orderController.create);
router.get('/', orderController.getAll);

module.exports = router;
