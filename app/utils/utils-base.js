'use strict';
const AppBase = require('app-base');
const UtilsDAO = require('utils/utils-dao');
/*
| -----------------------------------------------------------------------
|  Utils Base
| -----------------------------------------------------------------------
*/
class Utils extends AppBase {
  /*
  | -----------------------------------------------------------------------
  |  Utils Base
  | -----------------------------------------------------------------------
  */
  constructor(app, name){
    super(app, name);
    let self = this;
    self.dao = new UtilsDAO(self.dbHelper);
  }
}
module.exports = Utils;
