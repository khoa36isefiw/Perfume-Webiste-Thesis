const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productController');

// router.put('/:id/soft-delete', ProductController.softDelete);
router.get('/:id', ProductController.getById);
router.put('/:id', ProductController.update);
// router.delete('/:id', ProductController.delete);
router.post('/', ProductController.create);
router.get('/', ProductController.getAll);

module.exports = router;
