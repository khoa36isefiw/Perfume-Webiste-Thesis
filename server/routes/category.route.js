const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/CategoryController');

router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);
router.get('/parent', categoryController.getParentCategory);
router.get('/:id/child', categoryController.getChildByPId);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.create);
router.get('/', categoryController.getAll);

module.exports = router;
