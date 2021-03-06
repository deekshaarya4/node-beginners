//create an app server
var express = require('express')
, flash = require('connect-flash')
 , helpers = require('view-helpers')
    , mongoStore = require('connect-mongo')(express)
    , fs = require('fs') 	
    , mongoose = require('mongoose')
    , passport=require('passport')
//create/connect to database
var dbname = 'test';
var uri = 'mongodb://localhost/' + dbname;
mongoose.connect(uri);
console.log('server.js : connecting to %s', uri);
//express settings
var app = express()
app.configure(function() {
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser('keyboard cat' ));
  
app.use(express.bodyParser());
 app.use(express.methodOverride())

 app.use(express.session({
      secret: 'spoc',
      store: new mongoStore({
        url: 'mongodb://localhost/' + dbname,
        collection : 'sessions'
      })
    }))
  app.use(passport.initialize());
  app.use(passport.session());

app.use(flash())
 app.use(helpers('node-beginners')) 
app.use(app.router);

});

//Bootstrap models
require('./Models/Login')
require('./Models/lab')

// bootstrap passport config
require('./config/passport.js')(passport)


//Bootstrap routes
require('./config/routes.js')(app, passport)

//start app
var PORT = process.env.PORT || 3000
app.listen(PORT)
console.log('Express app started on port '+PORT)

//expose app
exports = module.exports = app

