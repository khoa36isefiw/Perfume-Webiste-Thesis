const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const userController = require('../controllers/UserController');
const OrderController = require('../controllers/OrderController');

// router.get('/:id/orders', OrderController.getOrderByUserId);
router.post('/recover-password', userController.sendRecoverPassEmail);
router.post('/check-email-availability', userController.checkEmailAvailability);
router.put('/:id/delete', authToken.verifyTokenAdmin, userController.delete);
router.put('/:id/change-password', userController.changePassword);
router.put('/:id/profile', userController.updateProfile);
router.post('/:id/add-to-cart', userController.addToCart);
router.put('/:id/update-cart', userController.updateCart);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.get('/', userController.getAll);

module.exports = router;
