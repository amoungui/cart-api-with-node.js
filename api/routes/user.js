/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();

//import controller
var UserController = require('../controllers/UserController');

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.delete('/:userId', UserController.delete);

module.exports = router;
