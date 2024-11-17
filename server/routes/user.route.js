const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const userController = require('../controllers/UserController');
// const OrderController = require('../controllers/OrderController');

router.post('/:id/review/:productId', userController.review);
router.post('/recover-password', userController.sendRecoverPassEmail);
router.post('/check-email-availability', userController.checkEmailAvailability);
router.put('/:id/delete', authToken.verifyTokenAdmin, userController.delete);
router.put('/:id/change-password', userController.changePassword);
router.put('/:id/profile', userController.updateProfile);
router.post('/:id/add-to-cart', userController.addToCart);
router.post('/:id/remove-item', userController.removeItemFromCart);
router.put('/:id/update-cart', userController.updateCart);
router.post('/:id/clear-cart', userController.clearCart);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.get('/', userController.getAll);

module.exports = router;
