var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var cors = require('cors');
var http = require('http');
var app = express();
var router = express.Router();
var authenticate = jwt({
  secret: new Buffer('Es0kX75mOWii94sFKJ067G4USFAuMxPuu_Y1AdGFHWIE9RUb-IuaocsILcLel85h', 'base64'),
  audience: 'ULSWdMVxjbf9WFGBSNbMB5vkdjhZdEie'
});

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(__dirname + '/../client'));
app.use('/scripts', express.static(__dirname + '/../node_modules/'));
app.use('/secured', authenticate);

app.get('/ping', function(req, res) {
  res.send("All good. You don't need to be authenticated to call this");
});

app.get('/secured/ping', function(req, res) {
  res.status(200).send("All good. You only get this message if you're authenticated");
});

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

module.exports = app;
