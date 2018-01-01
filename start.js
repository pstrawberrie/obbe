//+ DB Setup
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });
mongoose.connect(process.env.DATABASE/*, {useMongoClient:true}*/);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});

// Import models
require('./models/Survey');

//+ App Setup
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const errorHandlers = require('./handlers/errorHandlers');

// Middlewares
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

// Webpack
if (app.get('env') === 'development') {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackDevConfig = require('./client/webpack.dev.config');
  var compiler = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
      stats: {colors: true}
  }));
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use(compression());
}

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  key: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Default Middleware
app.use(flash());
const moment = require('moment');
app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  //res.locals.h = helpers;
  next();
});

// Routes
var routes = require('./routes/index');
app.use('/', routes);

// 404 Errors
app.use(errorHandlers.notFound);

// Serious Errors
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}
app.use(errorHandlers.productionErrors);

// Start Server
const serverPort = 3001;
http.listen(serverPort, function(){
  console.log(`server started @ http://localhost:${serverPort}`);
});