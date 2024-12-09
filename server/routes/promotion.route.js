const express = require('express');
const router = express.Router();

const promotionController = require('../controllers/PromotionController');

router.post('/apply', promotionController.apply);
router.put('/:id/delete', promotionController.delete);
router.put('/:id', promotionController.update);
router.get('/:id', promotionController.getById);
router.post('/', promotionController.create);
router.get('/', promotionController.getAll);

module.exports = router;
