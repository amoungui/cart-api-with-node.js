/* 
 * Server file
 */
var http = require('http');
var app = require('./app');

var port = process.env.PORT || 8080;

var server = http.createServer(app);

server.listen(port);

