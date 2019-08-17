/* 
 * App file
 */
var express = require('express');
var app = express();

var productRoutes = require('./api/routes/products');
var orderRoutes = require('./api/routes/orders');
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


module.exports = app;