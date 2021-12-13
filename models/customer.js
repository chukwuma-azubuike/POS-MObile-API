const customerModel = (sequelize, Sequelize) => {


    const Customers = sequelize.define("Customers", {
  
      CustomerID: {
        type: Sequelize.BIGINT,
        primaryKey: true
      },
      FullName: {
        type: Sequelize.STRING,
  
      },
      AccountNumber: {
        type: Sequelize.STRING,
      },
      Bank: {
        type: Sequelize.STRING,
      },
      Pin: {
        type: Sequelize.STRING,
      },
      Balance: {
        type: Sequelize.DECIMAL,
      }
    }, {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
  
      // If don't want createdAt
      createdAt: false,
  
      // If don't want updatedAt
      updatedAt: false,
    });
    return Customers;
  }
  
  
  module.exports = customerModel;
  