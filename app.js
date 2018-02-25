if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

var express = require('express');
var path = require('path');
var cookieParser= require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var api = express.Router();
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var expressValidator = require('express-validator');
api.use(expressValidator());
var cons=require('consolidate');
var dust = require('dustjs-helpers');
const index=require('./routes/index');
const games=require('./routes/games');
require('./Objects/Entity');


// View Engine   //__dirname The directory name of the current module
//The path.join() method joins the specified path segments into one path
app.set('views', path.join(__dirname, 'views'));
app.engine('dust', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'dust');
// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser Middleware
//app.use() is basically a middleware that is usually used for rendering pages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());





// Express Validator
//render pages
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
      root    = namespace.shift(),
      formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', index);
app.use('/games/:game_name', games);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports=app;