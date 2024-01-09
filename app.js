const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql2');

const putil = require('./utilities/projectutility')
const dbconnector = require('./services/dbconnector')
const dbrelationdefiner = require('./services/dbrelationdefiner')

console.log("app[main]: imported every primary module, starting the app...")

// dbconnector.connect()
dbrelationdefiner.defineRelationships();

// import routes
const apiMiddleware = require('./services/apimiddleware');
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/Admin_router');
const testingRouter = require('./routes/Testing_router');
const usersRouter = require('./routes/Users_router');
const kubkaokabkangRouter = require('./routes/KubKaoKabKang_router');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile); // Set the HTML rendering engine
app.set('view engine', 'html'); // Set the view engine to render HTML
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// config routes
app.use(apiMiddleware.logRequest);
app.use('/', indexRouter);
app.use('/Admin', adminRouter);
app.use('/Testing', testingRouter);
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

module.exports = app; //test push
