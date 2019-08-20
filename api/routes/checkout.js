
var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/check-auth');

var CheckoutController = require('../controllers/CheckoutController');

router.get('/',checkAuth, CheckoutController.getCheckout );
router.post('/',checkAuth, CheckoutController.checkout );

module.exports = router;