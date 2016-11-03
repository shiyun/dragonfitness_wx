var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var compression = require('compression');
var bodyParser = require('body-parser');

var baseInfo = require('./routes/middleware/baseInfo');
var hbs = require('hbs');
var helper = require("./util/registerHelper");
var api = require('./routes/api');
var otherapi = require('./routes/otherapi');
var isLogin = require('./util/isLogin');

var routes = require('./routes/index');
var otherapi = require('./routes/otherapi');
var users = require('./routes/users');
var wx = require('./routes/wxapi');

var api_serverUrl = require('./routes/middleware/api_serverUrl');
var api_dataCont = require('./routes/middleware/api_dataCont');
var api_auth = require('./routes/middleware/api_auth');
var api_docType = require('./routes/middleware/api_docType');
var api_encrypt = require('./routes/middleware/api_encrypt');
var api_callback = require('./routes/middleware/api_callback');

var app = express();

app.disable('x-powered-by');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
hbs.registerPartials(__dirname + '/views/include');

hbs.registerHelper("replaceImg",helper.replaceImg);
hbs.registerHelper("isEqual",helper.isEqual);
hbs.registerHelper("splitFiled",helper.splitFiled);
hbs.registerAsyncHelper("norender",helper.norender);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(session({
	secret: 'dragonfitness',
	name: 'dragonfitness',
	cookie: {maxAge: 3*24*60*60*1000},
	resave: false,
	saveUninitialized: true
}));
app.use(baseInfo);

app.use('/', routes);
app.use('/', otherapi);
app.use('/wx', wx);
app.use('/users', users);
app.use('/users', users);
app.use('/api', api);
app.use('/api', api_serverUrl);
app.use('/api', api_encrypt);
app.use('/api', api_dataCont);
app.use('/api', api_auth);
app.use('/api', api_docType);
app.use('/api', api_callback);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
