const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const brandController = require('../controllers/BrandController');

router.put('/:id/delete', authToken.verifyTokenAdmin, brandController.delete);
router.put('/:id', authToken.verifyTokenAdmin, brandController.update);
router.delete('/:id', authToken.verifyTokenAdmin, brandController.destroy);
router.get('/:id', brandController.getById);
router.post('/', authToken.verifyTokenAdmin, brandController.create);
router.get('/', brandController.getAll);

module.exports = router;
