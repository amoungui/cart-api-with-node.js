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
           .select('name price _id')
           .exec()
           .then(function(docs){
                var response = {
                    count: docs.length,
                    products: docs.map(function(doc){
                        return {
                            name: doc.name,
                            price: doc.price,
                            _id: doc._id,
                            request: {
                                type: "GET",
                                url: "http://localhost:8080/products/"+doc._id
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
                res.status(201).json({
                    message: 'Product were successfully created',
                    //pass the product to the response
                    createdProduct: {
                        name: result.name,
                        price: result.price,
                        _id: result._id,
                        request:{
                            type: "GET",
                            url: "http://localhost:8080/products/"+result._id
                        }
                    }
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
           .select('name price _id')
           .exec()// execute the query
           .then(function(doc){
                console.log("From database",doc);
                if(doc){
                    res.status(200).json({
                        product: doc,
                        request: {
                            type: 'GET',
                            url:"http://localhost:8080/products"
                        }
                    });// return response if the query is success                    
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
               res.status(200).json({
                    message: 'Product updated',
                    request:{
                        type: "GET",
                        url: "http://localhost:8080/products/"+id
                    }
               });
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
    Product.deleteOne({_id: id})// for delete one product in db or if you want to delete more than one you could use deleteMany
           .exec()
           .then(function(result){
               res.status(200).json({
                    message: 'Product deleted',
                   request: {
                       type: 'POST',
                       url: "http://localhost:8080/products/",
                       body: {name: 'String', price: 'Number'}
                   }
               });
           })
           .catch(function(err){
               console.log(err);
               res.status(500).json({
                   error: err
               });
           });
};