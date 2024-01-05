var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const mongoose = require('mongoose');
const mysql = require('mysql2');

const putil = require('./utilities/projectutility')
const dbconnector = require('./services/dbconnector')
const dbrelationdefiner = require('./services/dbrelationdefiner')

console.log("app[main]: imported every primary module, starting the app...")

// mongoose.Promise = global.Promise;

// mongoose.connect("mongodb://127.0.0.1:27017")
// .then(()=> console.log("app[mongoose]: Database connected."))
// .catch((err)=> console.error(err))

// dbconnector.connect()
dbrelationdefiner.defineRelationships();

// import routes
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/Admin_router');
var usersRouter = require('./routes/Users_router');
var kubkaokabkangRouter = require('./routes/KubKaoKabKang_router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// config routes
app.use('/', indexRouter);
app.use('/Admin', adminRouter);
app.use('/Users', usersRouter);
app.use('/KubKaoKabKang', kubkaokabkangRouter);


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
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
