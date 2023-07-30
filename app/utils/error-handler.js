'use strict';
const Logger = require('utils/logger');
const MysqlDbHelper = require('utils/mysql-db-helper');
const UtilsDAO = require('utils/utils-dao');
/*
| -----------------------------------------------------------------------
|  ErrorHandler
| -----------------------------------------------------------------------
*/
class ErrorHandler {
  /*
  | -----------------------------------------------------------------------
  |  constructor
  | -----------------------------------------------------------------------
  */
  constructor(app, name) {
    let self = this;
    self.name = name;
    //self.dbHelper = new MysqlDbHelper(app.pools.jot);
    //self.dao = new UtilsDAO(self.dbHelper);
    self.logger = new Logger(self.name);
    self.appNamePrefix = 'Jot API :: ';
  }

  /*
  | -----------------------------------------------------------------------
  |  logError
  | -----------------------------------------------------------------------
  */
  async logError(params) {
    let self = this;

    try {
      //Dump it to the log
      if(params.errorObject) {
        self.logger.error('Errors Occured : ');
        console.log(params.errorObject);
      }

      /*
      //Make sure our message isnt too long
      if(params.errorMessage && params.errorMessage.length > 4000) {
        params.errorMessage = params.errorMessage.substring(0,4000);
      }

      //Use name from internal if not provided one
      if(!params.appName) {
        params.appName = self.name;
      }

      //Prepend an app name unless..
      let addName = (params.skipPrefix) ? false : true;
      if(addName) {
        params.appName = self.appNamePrefix + params.appName;
      }

      //Log it
      await self.dao.postError(params.processId, params.instanceId, params.errorMessage);
      */

      self.logger.info('Logged Error for application [' + params.process + ']');
      return {
        errorFlag: 1,
        error: params.errorMessage,
        success: 0,
        status: 'false',
        confirmation: 'false'
      };
    } catch(err) {
      throw(err);
    }
  }

}
module.exports = ErrorHandler;
