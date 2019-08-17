/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');

exports.get_all_order = function(req, res, next){
    
    res.status(200).json({
        message: 'Order were fetched'
    });
};

exports.create_order = function(req, res, next){
    //create order javascript Objet
    var order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Order was created',
        //pass order Objet to the response
        order: order
    });
};

exports.get_order = function(req, res, next){
    var id = req.params.orderId;
        res.status(200).json({
            message: 'Order details',
            id: id
        });        
};

exports.delete_order = function(req, res, next){
    var id = req.params.orderId;
    res.status(200).json({
        message: 'Deleted order ID',
        id: id
    });        
};

