const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const brandController = require('../controllers/BrandController');

router.put('/:id/delete', brandController.delete);
router.put('/:id', brandController.update);
router.delete('/:id', brandController.destroy);
router.get('/:id', brandController.getById);
router.post('/', brandController.create);
router.get('/', brandController.getAll);

module.exports = router;
