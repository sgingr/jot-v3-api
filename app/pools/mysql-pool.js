'use strict';
const Logger = require('utils/logger');
const mysql = require('mysql');
const EncyptionHelper = require('utils/encryption-helper');
/*
| -----------------------------------------------------------------------
|  MySql Connection Pool
| -----------------------------------------------------------------------
*/
module.exports = function(poolMeta) {
  let logger = new Logger('MySQL-Pool');
  let encryptionHelper = new EncyptionHelper();
  return function (callback) {
    //Set typecast up for bit columns
    if(!poolMeta.config.typeCast) {
      poolMeta.config.typeCast = function castField( field, useDefaultTypeCasting ) {
        if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
          var bit = field.string();
          return (bit === null) ? null : bit.charCodeAt(0);
        }
        return( useDefaultTypeCasting() );
      }
    }
    //Create the pool
    poolMeta.config.user = encryptionHelper.decryptText(poolMeta.config.user);
    poolMeta.config.password = encryptionHelper.decryptText(poolMeta.config.password);
    let pool = mysql.createPool(poolMeta.config);

    pool.on('connection', function (connection) {
      //app.logger.info('Connection ['+ connection.threadId + '] Created');
    });

    pool.on('release', function (connection) {
      //app.logger.info('Connection ['+ connection.threadId + '] released');
    });

    /*
    | -----------------------------------------------------------------------
    |  MySql DB drops connections somewhat quickly, this keeps some active to
    |   prevent signicficant delays in calls
    | -----------------------------------------------------------------------
    */
    let keepAlive = () => {
      pool.getConnection(function(err, connection){
        if(err) { return; }
        connection.ping();
        connection.release();
      });
    };
    setInterval(keepAlive, 60000);

    logger.info('Setup [' + poolMeta.type + '] Database Pool: ' + poolMeta.name);
    callback(null, pool);
  }
}
