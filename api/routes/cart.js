
var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/check-auth');

var CartController = require('../controllers/CartController');

router.get('/:id',checkAuth, CartController.get_in_cart );
router.get('/',checkAuth, CartController.shopping_cart );

module.exports = router;