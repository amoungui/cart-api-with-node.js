var mongoose = require('mongoose');

//create a structure of product table
var productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    price: { type: Number, required: true}
});

module.exports = mongoose.model('Product', productSchema);

