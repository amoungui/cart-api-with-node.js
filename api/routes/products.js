

var express = require('express');
var router = express.Router();

var ProductController = require('../controllers/ProductController');

router.get('/', ProductController.get_all_product );
router.post('/', ProductController.create_product );
router.get('/:productId', ProductController.get_product );
router.patch('/:productId', ProductController.update_product );
router.delete('/:productId', ProductController.delete_product );

module.exports = router;