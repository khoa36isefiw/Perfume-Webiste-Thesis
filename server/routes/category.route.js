const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/CategoryController');
const authToken = require('../middlewares/authToken');

router.put('/:id', authToken.verifyTokenAdmin, categoryController.update);
router.delete('/:id', authToken.verifyTokenAdmin, categoryController.delete);
router.get('/parent', categoryController.getParentCategory);
router.get('/:id/child', categoryController.getChildByPId);
router.get('/:id', categoryController.getById);
router.post('/', authToken.verifyTokenAdmin, categoryController.create);
router.get('/', categoryController.getAll);

module.exports = router;
