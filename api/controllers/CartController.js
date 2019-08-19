var mongoose = require('mongoose');
//import the product model
var Cart = require('../models/cart');
var Product = require('../models/product');

exports.get_in_cart = function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart? req.session.cart: {items: {}});
    Product.findById(productId, function(err, product){
        if(err){
           res.status(500).json({error: err});
        }
        
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.status(200).json({
            message: "product added",
            cart: req.session.cart
        });
    });
};


exports.add = function(req, res, next){
  Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(function(order){
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(function(err){
      res.status(500).json({
        error: err
      });
    });        
};
