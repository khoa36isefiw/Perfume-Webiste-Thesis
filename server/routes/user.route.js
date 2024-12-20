const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const userController = require('../controllers/UserController');
const uploadCloud = require('../middlewares/uploader');
// const OrderController = require('../controllers/OrderController');

router.post('/review', authToken.authenticationToken, userController.review);
router.post('/subscribe', userController.subscribe);
router.post('/recover-password', userController.sendRecoverPassEmail);
router.post('/check-email-availability', userController.checkEmailAvailability);
router.put('/:id/delete', authToken.verifyTokenAdmin, userController.delete);
router.put('/:id/change-password', authToken.authenticationToken, userController.changePassword);
router.put(
    '/:id/profile',
    authToken.authenticationToken,
    uploadCloud.single('imagePath'),
    userController.updateProfile,
);
router.post('/:id/add-to-cart', authToken.authenticationToken, userController.addToCart);
router.post('/:id/remove-item', authToken.authenticationToken, userController.removeItemFromCart);
router.put('/:id/update-cart', authToken.authenticationToken, userController.updateCart);
router.post('/:id/clear-cart', authToken.authenticationToken, userController.clearCart);
router.put('/:id', authToken.authenticationToken, userController.update);
router.delete('/:id', authToken.verifyTokenAdmin, userController.destroy);
router.get('/:id', userController.getById);
router.post('/', authToken.verifyTokenAdmin, userController.create);
router.get('/', userController.getAll);

module.exports = router;
