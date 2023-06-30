# cart-api-with-node.js

Run API
This is a Node.js module available use the npm to run app, open cmd inside the repertory of your projet. Run is done using the npm start command:

`$ npm start`

API

Nodemon.js file
to connect your api to mongodb Atlas change the MONGO_ATLAS_PW password to your own password mongodb Atlas into the nodemon file
``{
    "env": {
        "MONGO_ATLAS_PW": "Your own password MONGO_ATLAS_PW",
        "JWT_KEY": "secret"
    }
}
``

app.js

change the mongoose.connect params and add your own url to access to mongodb Atlas 
``
mongoose.connect('mongodb+srv://name:'+process.env.MONGO_ATLAS_PW +'@marvel-biyxx.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
    //useMongoClient: true
});
``

Now you can use your API correctly
