const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const productController = require('../controllers/product.controller');

router.get('/', auth, productController.getAll);
router.post('/', auth, productController.create);
router.put('/:id', auth, productController.update);
router.delete('/:id', auth, productController.remove);

module.exports = router;
