var mongoose = require('mongoose');
//import the product model
var Cart = require('../models/cart');
var Product = require('../models/product');

exports.getCheckout = function(req, res, next){
    var message = req.session.cart;
    if(!message){
        res.status(200).json({
            message: "Not product in your Cart",
            url: "http://localhost:8080/products/"
        });
    }
    var cart = new Cart(message);
    
    res.status(200).json({
        message: "Checkout your shopping cart",
        //products: cart.generateArray(),
        totalPrice: cart.totalPrice,
        buttonInfo: "Following the link to buy your commande with Stripe API",
        request: {
            type: "POST",
            BuyWithStripe: "http://localhost:8080/checkout/"
        }        
    });    
};


exports.checkout = function(req, res, next){
    var data = req.body;
    var message = req.session.cart;
    var token = null;
    //console.log(data);
    if(!message){
        res.status(200).json({
            message: "Not product in your Cart",
            url: "http://localhost:8080/products/"
        });
    }
    var cart = new Cart(message);

    var stripe = require("stripe")("sk_test_ygWt2bASL7DDcGjNzcylg8Qr");
    
    stripe.tokens.create({
      card: {
        "number": data.number,
        "exp_month": data.exp_month,
        "exp_year": data.exp_year,
        "cvc": data.cvc
      }
    }, function(err, token) {
        res.status(201).json({
            message: "Successfully bought product!",
            token: token
        });
    });
    
//    stripe.charges.create({
//        amount: cart.totalPrice*100,
//        currency: "usd",
//        source: token, // obtained with Stripe.js
//        description: "Charge test"
//    }, function(err, charge) {
//
//    }).then(
//        res.status(201).json({
//            message: "Successfully bought product!"
////            token: token.id
//        })   
//    ).catch(
//        res.status(500).json({
//            error: "err"
//        })
//    );            
};