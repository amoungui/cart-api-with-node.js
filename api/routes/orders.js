
var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/check-auth');

var OrderController = require('../controllers/OrderController');

router.get('/', checkAuth, OrderController.get_all_order );
router.post('/', checkAuth, OrderController.create_order );
router.get('/:orderId', checkAuth, OrderController.get_order );
router.delete('/:orderId', checkAuth, OrderController.delete_order );

module.exports = router;

