var express = require('express')
   , flash = require('connect-flash')
, mongoStore = require('connect-mongo')(express)
 

module.exports = function (app,passport) {

   // cookieParser should be above session
    app.use(express.cookieParser())
    // bodyParser should be above methodOverride
    app.use(express.bodyParser())
    app.use(express.methodOverride())
    // express/mongo session storage
     app.use(express.session({
      secret: 'spoc',
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }))
    // use passport session
    app.use(passport.initialize())
    app.use(passport.session())
    // connect flash for flash messages - should be declared after sessions
    app.use(flash())
    // routes should be at the last
    app.use(app.router)

  
    
   
  
  
}



