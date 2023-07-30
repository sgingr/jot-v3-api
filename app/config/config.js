'use strict';
/*
| -----------------------------------------------------------------------
|  Config - only store startup type things here, others go in db table
| -----------------------------------------------------------------------
*/
module.exports = {
  /*
  | -----------------------------------------------------------------------
  |  Database Pools
  | -----------------------------------------------------------------------
  */
  dbPools: [
    /*
    | -----------------------------------------------------------------------
    |  DB
    | -----------------------------------------------------------------------
    */
    {
      name: 'jot',
      env: process.env.ENV_NAME,
      module: 'pools/mysql-pool',
      type: 'mysql',
      helperName: 'mysqlDbHelper',
      helperModule: 'utils/mysql-db-helper',
      config: JSON.parse(process.env.DB_POOL_CONFIG)
    },
  ],
  /*
  | -----------------------------------------------------------------------
  |  Misc
  | -----------------------------------------------------------------------
  */
  port: process.env.API_PORT,
  envName: process.env.ENV_NAME,
  loggerAppName: process.env.LOGGER_APP_NAME,
  loggerDateFormat: process.env.LOGGER_DATE_FORMAT,
}
