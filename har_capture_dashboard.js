var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var uniform_resource_locator = require('./routes/uniform_resource_locators');
var host = require('./routes/hosts');
var records = require('./routes/detailed_records');

var har_capture_dashboard = express();

// view engine setup
har_capture_dashboard.set('views', path.join(__dirname, 'views'));
har_capture_dashboard.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//har_capture_dashboard.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
har_capture_dashboard.use(logger('dev'));
har_capture_dashboard.use(bodyParser.json());
har_capture_dashboard.use(bodyParser.urlencoded({ extended: false }));
har_capture_dashboard.use(cookieParser());
har_capture_dashboard.use(express.static(path.join(__dirname, 'public')));

har_capture_dashboard.use('/', routes);
har_capture_dashboard.use('/', uniform_resource_locator);
har_capture_dashboard.use('/', host);
har_capture_dashboard.use('/', records);


// catch 404 and forward to error handler
har_capture_dashboard.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (har_capture_dashboard.get('env') === 'development') {
  har_capture_dashboard.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
har_capture_dashboard.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = har_capture_dashboard;
