const cashierModel = (sequelize, Sequelize) => {


    const Cashiers = sequelize.define("Cashiers", {
  
      CashierID: {
        type: Sequelize.BIGINT,
        primaryKey: true
      },
      FirstName: {
        type: Sequelize.STRING,
  
      },
      LastName: {
        type: Sequelize.STRING,
      },
      Email: {
        type: Sequelize.STRING,
      },
      Password: {
        type: Sequelize.STRING,
      }

    }, {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
  
      // If don't want createdAt
      createdAt: false,
  
      // If don't want updatedAt
      updatedAt: false,
    });
    return Cashiers;
  }
  
  
  module.exports = cashierModel;
  