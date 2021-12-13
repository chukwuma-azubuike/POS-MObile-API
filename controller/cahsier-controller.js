// const db = require('./../configs/sequelizeConfig');
const db = require("../config");
const moment = require('moment');

const Cashiers = db.Cashiers;
const sequelize = require('sequelize');
const { where } = require("sequelize");
// const Channels = db.Channels;



const getAllCashiers = ((req, res) => {
    try {
        Cashiers.findAll().then(response => {
            res.json(response);

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

const loginCashier = ((req, res) => {
    var email = req.body.email
    var password = req.body.password
    // console.log(req.body)
    try {
        Cashiers.findOne({ where: { Email: email } }).then(response => {
            // console.log(response);
            if (!response) {
                res.json({
                    success: false,
                    data: response,
                    errorMessage: 'User does not exist!'
                })
            }
            if (response.Password === password) {
                res.status(200).json({
                    success: true,
                    data: response,
                    message: 'Successfully Logged in!'
                })
            } else {
                res.json({
                    success: false,
                    data: response,
                    errorMessage: 'Incorrect password!'
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


const cashierController = {
    getAllCashiers: getAllCashiers,
    loginCashier: loginCashier
};

module.exports = cashierController;