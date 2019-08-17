/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');

exports.get_all_product = function(req, res, next){
    res.status(201).json({
        message: 'Handling POST requests to /products'
    });
};

exports.create_product = function(req, res, next){
    //create the product javascript Objet 
    var product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(200).json({
        message: 'Product were successfully created',
        //pass the product to the response
        createdProduct: product
    });    
};

exports.get_product = function(req, res, next){
    var id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message: 'You discover the special ID',
            id: id
        });        
    }else{
        res.status(200).json({
            message: 'You passed an ID',
            id: id
        });
    }
};

exports.update_product = function(req, res, next){
    var id = req.params.productId;
    res.status(200).json({
        message: 'Updated product ID',
        id: id
    });        
};

exports.delete_product = function(req, res, next){
    var id = req.params.productId;
    res.status(200).json({
        message: 'Deleted product ID',
        id: id
    });        
};