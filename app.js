/* 
 * App file
 */
var express = require('express');
var app = express();
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var productRoutes = require('./api/routes/products');
var orderRoutes = require('./api/routes/orders');
var userRoutes = require('./api/routes/user');
var cartRoutes = require('./api/routes/cart');

mongoose.connect('mongodb+srv://jazzmastaz:'+process.env.MONGO_ATLAS_PW +'@marvel-biyxx.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
    //useMongoClient: true
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({  
    extended: true  
})); 
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180*60*1000 }
}));
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-with, Content-Type, Accept, Authorization');
    
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);

app.use(function(req, res, next){
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

app.use(function(req, res, next){
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message 
        }
    });
});


module.exports = app;