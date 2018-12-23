var createError = require('http-errors');
var fs = require('fs');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/contents/show',express.static('uploads'));
app.use('/contents/update',express.static('uploads'));

app.use(session({
  secret:'wjdfasfdasdf',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))

var passport = require('./lib/passport')(app);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contentsRouter = require('./routes/contents');
var authRouter = require('./routes/auth')(passport);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contents',contentsRouter);
app.use('/auth',authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  res.status(500).json({
    message: err.message,
    error: err
  });
  
});

module.exports = app;
