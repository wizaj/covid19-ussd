'use strict';

require('dotenv').config();
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var index      = require('./routes/index');
var ussd       = require('./routes/ussd');
var fs         = require('fs');
var logger     = require('morgan');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var accessLogStream = fs.createWriteStream(__dirname + 'app.log', { flags: 'a' });

app.use(logger('combined', {
  stream: accessLogStream,
  skip: function (req, res) {
    return res.statusCode < 400;
  }
}));

app.use(logger('dev'));

var port = process.env.PORT || 8000;
var models = require('./models');

// Import routes
app.get('/', index.index);
app.post('/ussd', ussd.wiredUssd);

models.sequelize.sync({logging: false}).then(function () {
  var server = app.listen(port, function() {
      console.log('Watch, as the magic happens on port ' + server.address().port+ '! Yeaahh baaaaaabby');
  });
});
