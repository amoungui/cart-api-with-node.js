/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
//import the product model
var Order = require('../models/order');
var Product = require('../models/product');

exports.get_all_order = function(req, res, next){
    Order.find()
           .select('quantity product _id')
           .populate('product', 'name')
           .exec()
           .then(function(docs){
                var response = {
                    count: docs.length,
                    order: docs.map(function(doc){
                        return {
                            product: doc.product,
                            quantity: doc.quantity,
                            _id: doc._id,
                            request: {
                                type: "GET",
                                url: "http://localhost:8080/orders/"+doc._id
                            }
                        };
                    })
                };
                res.status(201).json(response);                           
           })
           .catch(function(err){
               console.log(err);
               re.status(500).json({
                   error: err
               });
           });
};

exports.create_order = function(req, res, next){
    Product.findById(req.body.productId)
           .then(function(product){
                if(!product){
                    return res.status(404).json({
                        message: 'Product not found'
                    });
                }
                var order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    quantity: req.body.quantity,
                    product: req.body.productId
                });

                return order
                    .save();                
            })
            .then(function(result){
                console.log(result);
                res.status(201).json({
                    message: 'Order stored',
                    createdOrder:{
                        _id: result.id,
                        product: result.product,
                        quantity: result.quantity
                    },
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8080/orders' + result._id
                    }
                });
            })
            .catch(function(err){
                console.log(err);
                res.status(500).json({error: err});
            }); 
};

exports.get_order = function(req, res, next){
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

exports.delete_order = function(req, res, next){
  Order.deleteOne({ _id: req.params.orderId })
    .exec()
    .then(function(result){
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(function(err){
      res.status(500).json({
        error: err
      });
    });        
};

