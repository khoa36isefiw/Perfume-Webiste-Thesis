const express = require('express');
const router = express.Router();

const promotionController = require('../controllers/PromotionController');
const authToken = require('../middlewares/authToken');

router.post('/apply', authToken.authenticationToken, promotionController.apply);
router.put('/:id/delete', authToken.verifyTokenAdmin, promotionController.delete);
router.put('/:id', authToken.verifyTokenAdmin, promotionController.update);
router.get('/:id', promotionController.getById);
router.post('/', authToken.verifyTokenAdmin, promotionController.create);
router.get('/', promotionController.getAll);

module.exports = router;
