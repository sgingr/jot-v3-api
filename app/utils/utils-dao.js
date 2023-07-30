'use strict'
const Logger = require('utils/logger');
const EncryptionHelper = require('utils/encryption-helper');
/*
| -----------------------------------------------------------------------
|  UtilsDAO
| -----------------------------------------------------------------------
*/
class UtilsDAO {
  /*
  | -----------------------------------------------------------------------
  |  constructor
  | -----------------------------------------------------------------------
  */
  constructor(dbHelper) {
    let self = this;
    self.dbHelper = dbHelper;
    self.logger = new Logger('UtilsDAO');
    self.encryptionHelper = new EncryptionHelper();
  }

  /*
  | -----------------------------------------------------------------------
  |  getConfigData
  | -----------------------------------------------------------------------
  */
  async getConfigData() {
    let self = this;
    let data = {};
    let sql = "SELECT NAME as \"name\", VALUE as \"value\", UPPER(TYPE) as \"type\" FROM CONFIG WHERE ACTIVE = 1";
    let rows = await self.optimizerDbHelper.executeSqlAwait(sql);
    rows.forEach((item) => {
      //Possibly convert values
      if(item.type === 'ENCRYPTED') {
        data[item.name] = self.encryptionHelper.decryptText(item.value);
      } else if(item.type === 'NUMBER' || item.type === 'INT') {
        data[item.name] = parseInt(item.value);
      } else {
        data[item.name] = item.value;
      }
    });
    return data;
  }

  /*
  | -----------------------------------------------------------------------
  |  deleteConfigEntry
  | -----------------------------------------------------------------------
  */
  deleteConfigEntry(name) {
    let self = this;
    let sql = "UPDATE CONFIG SET last_modified = SYSDATE, active = 0 WHERE UPPER(name) = :name";
    let nameBind = name.toUpperCase();
    return self.optimizerDbHelper.executeSqlAwait(sql, [nameBind]);
  }

  /*
  | -----------------------------------------------------------------------
  |  addConfigEntry
  | -----------------------------------------------------------------------
  */
  async addConfigEntry(name, value, typeIn) {
    let self = this;
    let type = (typeIn) ? typeIn : 'string';

    //Purge new addition
    let delSql = "DELETE FROM CONFIG WHERE UPPER(name) = :name";
    let nameBind = name.toUpperCase();
    await self.optimizerDbHelper.executeSqlAwait(delSql, [nameBind]);

    //Add it
    let sql = "INSERT INTO CONFIG (last_modified,name,value,type) VALUES (SYSDATE,:name,:value,:type)";
    if(type.toUpperCase() === 'ENCRYPTED') {
      value = self.encryptionHelper.encryptText(value);
    }
    return self.optimizerDbHelper.executeSqlAwait(sql, [name, value, type]);
  }

  /*
  | -----------------------------------------------------------------------
  |  updateConfigEntry
  | -----------------------------------------------------------------------
  */
  updateConfigEntry(name, value, typeIn) {
    let self = this;
    let typeUpdateSql = (typeIn) ? ', type = :type ' : '';
    let sql = "UPDATE CONFIG SET last_modified = SYSDATE, value = :value " + typeUpdateSql + " WHERE UPPER(name) = :name";
    if(typeIn && typeIn.toUpperCase() === 'ENCRYPTED') {
      value = self.encryptionHelper.encryptText(value);
    }
    let queryParams = [value];
    if(typeIn) {
      queryParams.push(typeIn);
    }
    queryParams.push(name.toUpperCase());
    return self.optimizerDbHelper.executeSqlAwait(sql, queryParams);
  }

  /*
  | -----------------------------------------------------------------------
  |  postError
  | -----------------------------------------------------------------------
  */
  async postError(processId, instanceId, errMsg) {
    let self = this;

    //Add it
    let sql = `INSERT INTO error_log (process_id, instance_Id, error_message) VALUES (?,?,?)`;
    return self.dbHelper.executeSqlAwait(sql, [processId, instanceId, errMsg]);
  }


}
module.exports = UtilsDAO
