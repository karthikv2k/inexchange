var express = require('express');
//compiles all dust templates
require('./dustc');  
DB = require('./db.js');
console.log(DB);

var MemStore = express.session.MemoryStore;
var app = module.exports = express.createServer(
    express.cookieParser(),
    express.session({ secret: "crazysecretstuff"})
      );

// add any common code 
app.get('*', function(req, res, next) {
    next();
    });

//include all routes - there should be a better way to do this 
var routes = require('../routes/home.js')(app);
var routes = require('../routes/li.js')(app);
var routes = require('../routes/se.js')(app);

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'ejs');
  app.use(express.logger({ format: ':method :url' }));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/../public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var port = CONFIG.PORT || 5000;
app.listen(port, function() {
      console.log("Listening on " + port);
      });
