'use strict'
const AppBase = require('app-base');
const UiDAO = require('ui/ui-dao');
const Logger = require('utils/logger');
/*
| -----------------------------------------------------------------------
|  UI Base
| -----------------------------------------------------------------------
*/
class UI extends AppBase {
  /*
  | -----------------------------------------------------------------------
  |  constructor
  | -----------------------------------------------------------------------
  */
  constructor(app, name){
    super(app, name);
    let self = this;
    self.dao = new UiDAO(self.dbHelper);
    self.logger = new Logger('UI');
  }

}

module.exports = UI;
