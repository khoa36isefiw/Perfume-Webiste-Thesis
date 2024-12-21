const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const brandController = require('../controllers/BrandController');

router.put('/:id', authToken.verifyTokenAdmin, brandController.update);
router.delete('/:id', authToken.verifyTokenAdmin, brandController.delete);
router.get('/:id', brandController.getById);
router.post('/', authToken.verifyTokenAdmin, brandController.create);
router.get('/', brandController.getAll);

module.exports = router;
