
var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/check-auth');

var CartController = require('../controllers/CartController');

router.get('/:id', CartController.get_in_cart );
//router.get('/:orderId', CartController.get_order );

module.exports = router;