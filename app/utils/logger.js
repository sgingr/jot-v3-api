'use strict';
const moment = require('moment');
const info = ' INFO ';
const warn = ' WARN ';
const err  = ' ERROR';
const debug  = ' DEBUG';
const mainAppName = 'JOT-API';
/*
| -----------------------------------------------------------------------
|  Simple Logger
| -----------------------------------------------------------------------
*/
class Logger {
  /*
  | -----------------------------------------------------------------------
  |  constructor
  | -----------------------------------------------------------------------
  */
  constructor(appName) {
    let self = this;
    self.appName = appName;
    self.loggerDateFormat = 'HH:mm:ss,SSS';
  }

  /*
  | -----------------------------------------------------------------------
  |  _logger
  | -----------------------------------------------------------------------
  */
  _logger(type, stuff) {
    let self = this;
    let dt = moment().format(self.loggerDateFormat);
    let appNameStr = (self.appName) ? mainAppName + ' :: ' + self.appName : mainAppName;
    console.log(dt + type + ' [' + appNameStr + '] ' + stuff);
  }

  /*
  | -----------------------------------------------------------------------
  |  info
  | -----------------------------------------------------------------------
  */
  info(stuff) {
    let self = this;
    self._logger(info, stuff);
  }

  /*
  | -----------------------------------------------------------------------
  |  warn
  | -----------------------------------------------------------------------
  */
  warn(stuff) {
    let self = this;
    self._logger(warn, stuff);
  }

  /*
  | -----------------------------------------------------------------------
  |  error
  | -----------------------------------------------------------------------
  */
  error(stuff) {
    let self = this;
    self._logger(err, stuff);
  }

  /*
  | -----------------------------------------------------------------------
  |  debug
  | -----------------------------------------------------------------------
  */
  debug(stuff) {
    let self = this;
    if(process.env.OPTIMIZER_API_DEBUG) {
      self._logger(debug, stuff);
    }
  }

}
module.exports = Logger;
