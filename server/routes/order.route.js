const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.get('/user/:userId', orderController.getByUserId);
router.get('/:id', orderController.getById);
router.post('/', orderController.create);
router.get('/', orderController.getAll);

module.exports = router;
