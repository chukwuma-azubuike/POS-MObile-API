const config = require("./dbconfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,

  {
    host: config.server,
    dialect: config.options.instancename,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

// checks the database connectivity
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
// Instantiate the Database object
const db = {};

// Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB,
// SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.
// Sequelize follows Semantic Versioning and supports Node v10 and above.

db.Sequelize = Sequelize;
db.sequelize = sequelize;

 // Cashier Details
db.Cashiers = require("./models/cashier")(sequelize, Sequelize);
db.Customers = require("./models/customer")(sequelize, Sequelize);

module.exports = db;