var mongoose = require('mongoose');

//create a structure of product table
var orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: { type: Number, default: 1}
});

module.exports = mongoose.model('Order', orderSchema);

