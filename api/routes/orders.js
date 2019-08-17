
var express = require('express');
var router = express.Router();

var OrderController = require('../controllers/OrderController');

router.get('/', OrderController.get_all_order );
router.post('/', OrderController.create_order );
router.get('/:orderId', OrderController.get_order );
router.delete('/:orderId', OrderController.delete_order );

module.exports = router;

