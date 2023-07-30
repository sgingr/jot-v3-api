'use strict'
const Common = require('utils/common');
const Logger = require('utils/logger');
const ErrorHandler = require('utils/error-handler');
/*
| -----------------------------------------------------------------------
|  ServiceBase
| -----------------------------------------------------------------------
*/
class ServiceBase {
  /*
  | -----------------------------------------------------------------------
  |  constructor
  | -----------------------------------------------------------------------
  */
  constructor(app, name){
    let self = this;
    self.app = app;
    self.name = name;
    self.common = new Common();
    self.logger = new Logger();
    self.logger.info('REQUEST [' + name + ']');
    self.errorHandler = new ErrorHandler(app, name);
  }
}
module.exports = ServiceBase;
