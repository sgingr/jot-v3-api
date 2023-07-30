'use strict'
const async = require('async');
const Common = require('utils/common');
const ErrorHandler = require('utils/error-handler');
const MysqlDbHelper = require('utils/mysql-db-helper');
/*
| -----------------------------------------------------------------------
|  App Base
| -----------------------------------------------------------------------
*/
class AppBase {
  /*
  | -----------------------------------------------------------------------
  |  constructor
  | -----------------------------------------------------------------------
  */
  constructor(app, name) {
    let self = this;
    self.app = app;
    self.name = name;
    self.async = require('async');
    self.dbHelper = new MysqlDbHelper(app.pools.jot);
    self.config = app.get('config');
    self.db = app.db;
    self.common = new Common();
    self.errorHandler = new ErrorHandler(app, name);
  }
}
module.exports = AppBase;
