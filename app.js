/**
 *  Include dependencies
 *  express - require express and initialize express function (createApplication)
 *  config - require config with secrets
 *  Database - require Database module
 *  Scrapper - require Scrapper module
 */
const path = require('path');
const process = require('process');
const express = require('express');
const config = require('./config/secrets.json');
const Database = require('./libs/database');
const Logger = require('./libs/logger');
const swaggerSpec = require('./libs/swagger');
const swaggerUI = require('swagger-ui-express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Routes = require('./app/routes');

/**
 *  Init Expressjs app
 */
const app = express();

/**
 *  Config application application
 *
 *  env - App environment
 *  port - App port
 *  cron - Config cron schedule, if there is no config const, run cron in every minute
 */
const env = process.env.NODE_ENV || 'production';
const port = process.env.PORT || config[env].port;

/**
 * Start application
 *
 * Connect to database
 */
Database();

/**
 *  Middleware config
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('etag');

app.use((err, req, res, next) => {
  if (err.status !== 404) return next();

  return res.send(err.message);
});

/**
 *  App API Routes
 */
app.use('/api', Routes);

/**
 *  App static Routes
 */
app.use('/static', express.static(path.join(__dirname, 'public')));

/**
 * App Swagger Documentation
 * */
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 *  Initialize server with port from env or config file
 */
app.listen(port, () => {
  Logger({message: `Server is listening at: ${port}`});
});
