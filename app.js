//
const express = require('express');
const compression = require('compression');
const helmet = require("helmet");
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const async = require('async');
const Agenda = require('agenda');
const fs = require('fs');
const rimraf = require('rimraf');
const seeder = require('./utils/seed')

//
const mongoose = require('./utils/mongoose');
const constants = require('./utils/constants')

//
const app = express();
app.use(compression());
app.use(helmet());
app.use(cors());

mongoose.connect(constants.mongoUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Mongoose connected.');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var newdb = true;
if (newdb) {
    seeder.newDb();
}

var seeding = false;
if (seeding) {
    seeder.seed();
}

module.exports = app;
