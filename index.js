'use strict';
require('app-module-path').addPath(__dirname);
require('app-module-path').addPath(__dirname + '/app');
require('dotenv').config({ path: '/home/sgingrco/nodejs/apps/jot-v3-api/.env' })
/*
| -----------------------------------------------------------------------
|  Jot-API
|   api for jot app
| -----------------------------------------------------------------------
*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const moment = require('moment');
const cookieParser = require("cookie-parser");
const Logger = require('utils/logger');
const routes = require('routes');
const config = require('config/config.js');
const auth = require("app/middleware/auth");
let logger = new Logger();
let logKey = ' INFO  [JOT-V3-API]';

let main = async () => {
  /*
  | -----------------------------------------------------------------------
  |  Main app
  | -----------------------------------------------------------------------
  */
  let app = express();

  /*
  | -----------------------------------------------------------------------
  |  Set up initial config
  | -----------------------------------------------------------------------
  */
  const ConfigHelper = require('utils/config');
  let configHelper = new ConfigHelper(config);
  app.set('config', config);
  app.set('configHelper', configHelper);

  /*
  | -----------------------------------------------------------------------
  |  Global Middleware
  | -----------------------------------------------------------------------
  */
  morgan.token('customApi', () => { return moment().format('HH:mm:ss,SSS') + logKey })
  app.enable('trust proxy');
  app.use(morgan(':customApi :remote-addr :method :url :status :response-time ms - :res[content-length]'));
  app.use(bodyParser.json());
  app.use(cookieParser());

  var whitelist = configHelper.getWhitelist();
  var corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

  app.use(cors(corsOptions));
  app.use(helmet());
  app.options('*', cors(corsOptions));

  /*
  | -----------------------------------------------------------------------
  |  Setup all the pool functions
  | -----------------------------------------------------------------------
  */
  let pools = await configHelper.setupPools();
  Object.assign(app, pools);
  logger.info('Database Pool Setup Completed');

  /*
  | -----------------------------------------------------------------------
  |  Load up config from database
  | -----------------------------------------------------------------------
  */
  let cfgData = await configHelper.loadConfig();
  console.log(cfgData);
  if (cfgData.isLocalInstance) {
    logger.info('***  Is a local Instance  ***');
  }
  app.set('config', cfgData);
  logger.info('Database Config Loaded');

  /*
  | -----------------------------------------------------------------------
  |  Add Routes
  | -----------------------------------------------------------------------
  */
  routes.forEach((route) => {
    //Default handler method
    let handlerMethod = (route.handlerMethod) ? route.handlerMethod : route.method + 'Data';

    //Add Route
    app[route.method](route.path, auth, (req, res) => {
      var handlerClass = require(route.handlerClass);
      let obj = new handlerClass(app, route.name);
      obj[handlerMethod](req, res);
    });
  });
  logger.info('Route Setup Completed');

  /*
  | -----------------------------------------------------------------------
  |  Listen up now
  | -----------------------------------------------------------------------
  */
  app.listen(config.port);
  logger.info('Listening on port [' + config.port + ']');
};

/*
| -----------------------------------------------------------------------
|  Main
| -----------------------------------------------------------------------
*/
try {
  main();
} catch (err) {
  logger.error('Errors Occurred starting the Jot-V3 API:')
  console.log(err);
}
