'use strict';

const PORT = process.env.PORT || 12345;

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var http = require('http');
var path = require('path');

var app = express();

var stormpath =  require("express-stormpath");

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(stormpath.init(app, {
  website: true,
  postLogoutRedirectUrl: "/login"
}));

app.get('/', stormpath.loginRequired, function(req, res) {
  var indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.use('/beers', require('./routes/beers'));

var server = http.createServer(app);


app.on("stormpath.ready", function() {
  server.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
  });
  console.log("stormpath ready");
});
