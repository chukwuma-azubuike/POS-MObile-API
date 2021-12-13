// const db = require('./../configs/sequelizeConfig');
const db = require("../config");
const moment = require('moment');

const Customers = db.Customers;
const sequelize = require('sequelize');
// const Channels = db.Channels;



const getAllCustomer = ((req, res) => {
    try {
        Customers.findAll().then(response => {
            res.send(response);
        }).catch(err => {
            const outputResponse = {
                success: false,
                status: 500,
                hasError: true,
                errorMessage:
                    err.message || 'Some error occurred while retrieving Tasqs.',
                data: null,
            };
            res.status(500).send(outputResponse);
        });
    } catch (error) {
        const outputResponse = {
            success: false,
            status: 500,
            hasError: false,
            errorMessage: error.message,
            data: null,
        };
        res.status(500).send(outputResponse);
    }

});


const verifyCustomer = ((req, res) => {
    var FullName = req.body.name
    var pin = req.body.pin
    var amount = req.body.amount
    // console.log(req.body)
    try {
        Customers.findOne({ where: { FullName: FullName } }).then(response => {
            // console.log(response);
            if (!response) {
                res.json({
                    success: false,
                    data: response,
                    errorMessage: 'Customer does not exist!'
                })
            }
            if (response.Pin === pin) {

                response.Balance < amount ?
                    res.json({
                        success: false,
                        errorMessage: 'Insufficient funds'
                    }) :

                    res.status(200).json({
                        success: true,
                        data: `Successfully withdrawn N${amount}`
                    })
            } else {
                res.json({
                    success: false,
                    data: response,
                    errorMessage: 'Incorrect pin!'
                })
            }
        }).catch(err => {
            const outputResponse = {
                success: false,
                status: 500,
                hasError: true,
                errorMessage:
                    err.message || 'Some error occurred while retrieving Tasqs.',
                data: null,
            };
            res.status(500).send(outputResponse);
        });
    } catch (error) {
        const outputResponse = {
            success: false,
            status: 500,
            hasError: false,
            errorMessage: error.message,
            data: null,
        };
        res.status(500).send(outputResponse);
    }

});


const customerController = {
    getAllCustomer: getAllCustomer,
    verifyCustomer: verifyCustomer
};

module.exports = customerController;