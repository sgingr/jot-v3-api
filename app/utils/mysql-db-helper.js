'use strict';
/*
| -----------------------------------------------------------------------
|  MySqlDbHelper
| -----------------------------------------------------------------------
*/
class MySqlDbHelper {
  /*
  | -----------------------------------------------------------------------
  |  constructor
  | -----------------------------------------------------------------------
  */
  constructor(pool) {
    this.pool = pool;
  }

  /*
  | -----------------------------------------------------------------------
  |  executeSql - callbacks
  | -----------------------------------------------------------------------
  */
  executeSql() {
    let self = this;
    var sql;
    var bindings = [];
    var cb;

    if(arguments.length === 2) {
      sql = arguments[0];
      cb = arguments[1];
    } else if(arguments.length === 3) {
      sql = arguments[0];
      bindings = arguments[1];
      cb = arguments[2];
    } else {
      return "invalid.."
    }

    self.pool.getConnection(function(err,connection){
      if (err) {
        cb({"code" : 100, "status" : "Error in connection database"},null);
      }
      connection.query(sql, bindings, function(err,rows){
        connection.release();
        if(err){
          cb(err,null);
        }
        else{
          cb(null, rows);
        }
      });
    });
  }

  /*
  | -----------------------------------------------------------------------
  |  executeSqlAwait - promises
  | -----------------------------------------------------------------------
  */
  executeSqlAwait(sql, bindingsIn) {
    let self = this;
    let bindings = (bindingsIn) ? bindingsIn : [];

    return new Promise((resolve, reject) => {
      self.pool.getConnection(
        (err,connection) => {
          if (err){
            throw new Error(err);
          } else {
            connection.query(sql,bindings, (err, data) => {
              connection.release();
              if(err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          }
        }
      );
    });
  }

}

module.exports = MySqlDbHelper;
