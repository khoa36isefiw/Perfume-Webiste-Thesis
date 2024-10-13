const express = require('express');
const router = express.Router();

const orderTimelineController = require('../controllers/OrderTimelineController');

router.put('/:id', orderTimelineController.update);
// router.delete('/:id', orderTimelineController.destroy);
router.get('/:id', orderTimelineController.getById);
router.post('/', orderTimelineController.create);
router.get('/', orderTimelineController.getAll);

module.exports = router;
