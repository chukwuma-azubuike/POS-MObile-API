require('dotenv').config()

const  config = {
    user:  'chukwuma', // sql user
    password:  process.env.DB_PASS, //sql user password
    server:  'pos-mobile-db.database.windows.net', // if it does not work try- localhost
    database:  'pos_mobileDB',
    options: {
      trustedconnection:  true,
      enableArithAbort:  true,
      instancename:  'mssql'  // SQL Server instance name
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    port:  1433,
    requestTimeout: 300000
  }
  console.log(process.env.DB_PASS);
  
  module.exports = config;
  