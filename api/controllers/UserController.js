/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
//import model user
var User  = require('../models/user');

exports.signup = function(req, res, next){
    User.find({email: req.body.email})
        .exec()
        .then(function(user){
            if(user.length >= 1){
                return res.status(409).json({
                    message: 'Mail exists'
                });
            }else{
                bcrypt.hash(req.body.password, 10, function(err, hash){
                            if(err){
                                return res.status(500).json({
                                    error: err
                                });
                            }else{
                                var user = new User({
                                    _id: mongoose.Types.ObjectId(),
                                    email: req.body.email,
                                    password: hash       
                                });               
                                user.save()
                                    .then(function(result){
                                        console.log(result);
                                        res.status(201).json({
                                            message: 'User created'
                                        });
                                    })
                                    .catch(function(err){
                                        console.log(err);
                                        res.status(500).json({
                                           error: err 
                                        });
                                    });
                            }
                        }
                    );                    
            }
        });    
};

exports.login = function(req, res, next){
    User.find({email: req.body.email})
        .exec()
        .then(function(user){
            if(user.length < 1){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, function(err, result){
                if(err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    });                        
                }
                if(result){
                    var token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY,{
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });                                                
                }
                return res.status(401).json({
                    message: 'Auth failed'
                });                                            
            });
        })
        .catch(function(err){
          res.status(500).json({
            error: err
          });
        });    
};

exports.delete = function(req, res, next){
    User.deleteOne({ _id: req.params.userId })
        .exec()
        .then(function(result){
            res.status(200).json({
              message: "User deleted"
            });
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({
              error: err
            });
        });    
};