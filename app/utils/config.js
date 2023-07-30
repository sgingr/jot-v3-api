'use strict';
const EncyptionHelper = require('utils/encryption-helper');
const MysqlDbHelper = require('utils/mysql-db-helper');
const Logger = require('utils/logger');
const async = require('async');
const os = require("os");
/*
| -----------------------------------------------------------------------
|  Config - handle interaction with config db table
| -----------------------------------------------------------------------
*/
class Config {
  /*
  | -----------------------------------------------------------------------
  |  constructor
  | -----------------------------------------------------------------------
  */
  constructor(config) {
    var self = this;
    self.config = config;
    self.logger = new Logger('ConfigHelper');
    self.encryptionHelper = new EncyptionHelper();
    self.host = os.hostname();
  }

  /*
  | -----------------------------------------------------------------------
  |  setupPools
  | -----------------------------------------------------------------------
  */
  async setupPools() {
    let self = this;

    //Setup all the pool functions
    let poolFuncs = {};
    self.config.dbPools.forEach((pool) => {
      poolFuncs[pool.name] = require(pool.module)(pool);
    });

    //Create Pools then add routes
    return new Promise((resolve, reject) => {
      async.parallel(poolFuncs, (err, results) => {
        if(err) {
          reject(err);
        } else {
          self.pools = results;
          self.db = {};
          //Set up DB Helpers
          self.config.dbPools.forEach((pool) => {
            if(pool.type && pool.type.toUpperCase() === 'ORACLE') {
              //self.db[pool.name] = new OracleDbHelper(self.pools[pool.name]);
            } else if(pool.type && pool.type.toUpperCase() === 'MYSQL') {
              self.db[pool.name] = new MysqlDbHelper(self.pools[pool.name]);
            }
          });
          resolve({ pools: self.pools, db: self.db });
        }
      });
    });

  }

  /*
  | -----------------------------------------------------------------------
  |  loadConfig
  | -----------------------------------------------------------------------
  */
  async loadConfig() {
    let self = this;
    let keepers = {};
    let jotDbHelper = new MysqlDbHelper(self.pools.jot);
    keepers.isLocalInstance = Boolean(!/^harplee/i.test(self.host));

    if(self.pools.jot) {
      let sql = 'SELECT * FROM config where active = 1';
      let data = await jotDbHelper.executeSqlAwait(sql);

      data.forEach(function(row) {
        //Convert Integers
        if(/int/i.test(row.data_type)) {
          keepers[row.key_name] = parseInt(row.value);
        }
        //Decrypt
        else if(/encrypted/i.test(row.data_type)) {
          keepers[row.key_name] = self.encryptionHelper.decryptText(row.value);
        }
        //Decrypt
        else if(/boolean/i.test(row.data_type)) {
          keepers[row.key_name] = Boolean(/true/i.test(row.value));
        }
        //Plain
        else {
          keepers[row.key_name] = row.value;
        }
      });
    } else {
      self.logger.error('Error - no pool defined for [jot] database');
    }
    return keepers;
  }


}
module.exports = Config;
