/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
//import the product model
var Product = require('../models/product');

//return all the products
exports.get_all_product = function(req, res, next){
    Product.find()
           .exec()
           .then(function(docs){
                console.log(docs);
//                if(docs.length >= 0){
                res.status(201).json(docs);                           
//                }else{
//                    
//                }
           })
           .catch(function(err){
               console.log(err);
               re.status(500).json({
                   error: err
               });
           });
};

//create a product
exports.create_product = function(req, res, next){
    //create the product javascript Objet 
    var product = new Product({
        _id: new mongoose.Types.ObjectId(),//give new unique id or create new for me
       name: req.body.name,
       price: req.body.price
    });
    //store product in db
    product.save()
           .then(function(result){
               console.log(result);
                res.status(200).json({
                    message: 'Product were successfully created',
                    //pass the product to the response
                    createdProduct: result
                });           
           })
           .catch(function(err){
               console.log(err);
               res.status(500).json({
                   error: err
               });
           });
};

//get one product
exports.get_product = function(req, res, next){
    var id = req.params.productId;
    Product.findById(id) //find one product in db
           .exec()// execute the query
           .then(function(doc){
                console.log("From database",doc);
                if(doc){
                    res.status(200).json(doc);// return response if the query is success                    
                }else{
                    res.status(404).json({
                        message: 'Not valid entry found for provider ID'
                    });
                }
           })
           .catch(function(err){
               console.log(err);
                res.status(500).json({
                    error: err
                });       
           });
};

exports.update_product = function(req, res, next){
    var id = req.params.productId;
    var updateOps = {};
    for (var ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, { $set: updateOps })
           .exec()
           .then(function(result){
               res.status(200).json(result);
           })
           .catch(function(err){
               console.log(err);
               res.status(500).json({
                  error: err 
               });
           });
};

//delete a product
exports.delete_product = function(req, res, next){
    var id = req.params.productId;
    Product.remove({_id: id})
           .exec()
           .then(function(result){
               res.status(200).json(result);
           })
           .catch(function(err){
               console.log(err);
               res.status(500).json({
                   error: err
               });
           });
    res.status(200).json({
        message: 'Deleted product ID',
        id: id
    });        
};