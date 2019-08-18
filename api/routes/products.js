

var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/check-auth');

var ProductController = require('../controllers/ProductController');

router.get('/', ProductController.get_all_product );
router.post('/', checkAuth, ProductController.create_product );
router.get('/:productId', ProductController.get_product );
router.patch('/:productId',checkAuth, ProductController.update_product );
router.delete('/:productId',checkAuth, ProductController.delete_product );

module.exports = router;