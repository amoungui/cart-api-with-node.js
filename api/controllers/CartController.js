var mongoose = require('mongoose');
//import the product model
var Cart = require('../models/cart');
var Product = require('../models/product');

exports.get_in_cart = function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart? req.session.cart: {});
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

exports.shopping_cart = function(req, res, next){
    var message = req.session.cart;
    if(!message){
        res.status(200).json({
            message: "Not product in your Cart",
            product: null
        });
    }
    var cart = new Cart(message);
    res.status(200).json({
        message: "you have product(s) in your Cart",
        products: cart.generateArray(),
        totalPrice: cart.totalPrice
    });    
};