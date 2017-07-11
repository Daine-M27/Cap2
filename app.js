const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const index = require('./routes/index');
const users = require('./routes/users');
const api = require('./routes/apiv1');
const path = require('path');


mongoose.promise = global.promise;
const {PORT, DATABASE_URL} = require('./config');
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('common'))

app.use('/', index);
app.use('/users', users);
app.use('/api', api);

// referenced by both runServer and closeServer. closeServer
// assumes runServer has run and set `server` to a server object
let server;

function runServer() {
    return new Promise((resolve, reject) => {
            mongoose.connect(DATABASE_URL, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(PORT, () => {
                console.log(`Your app is listening on port ${PORT}`);
    resolve();
})
.on('error', err => {
        mongoose.disconnect();
    reject(err);
});
});
});
}

function closeServer() {
    return mongoose.disconnect().then(() => {
            return new Promise((resolve, reject) => {
                console.log('Closing server');
    server.close(err => {
        if (err) {
            return reject(err);
        }
        resolve();
});
});
});
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
};




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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




module.exports = app, runServer, closeServer;

//, runServer, closeServer


