// Dependencies
const express = require('express')
const ejs = require('ejs')
const cors = require('cors')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const QRCode = require('qrcode')

require('dotenv').config()

//Constants
const port = 8080

// Express App
const app = express();

// Middleware
app.use(cors())
app.use(bodyParser());
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'view'))

//Database Connection
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'pos_mobile_app',
    multipleStatements: true
});

con.connect((err) => {
    if (err) throw err;
    console.log("MySQL DB Connected!");
});


//Routes
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'Hello POS Mobile App',
        status: 201
    })
})

app.get('/customer-signup', (req, res) => {
    var query = 'Insert into Customers values (1, "Jimoh", "Ibrahim", "jimoh@mail.com", "Ab@12345" )'
    con.query(query, (err, result) => {
        err ? console.error(err) :
            res.send('New customer created')
    })
})

app.get('/genrateQRCode', (req, res) => {
    var query = 'select FullName, Bank, AccountNumber from Customers'
    const qrCodeArray = []
    con.query(query, (err, result) => {
        err ? console.error(err) :
            result.forEach(element => {
                let data = JSON.stringify(element)
                QRCode.toDataURL(data, (err, url) => {
                    err ? console.error(err) :
                        qrCodeArray.push(url)
                })
            })
        setTimeout(() => {
            res.render('index', {
                qrCode: qrCodeArray[0]
            })
        }, 150)
    })
})

app.post('/login', (req, res, next) => {
    var email = req.body.email
    var password = req.body.password
    var query = `select * from Cashiers where Email = "${email}"`
    con.query(query, (err, result) => {
        err ?
            res.json({
                status: false,
                message: err.sqlMessage
            }) :
            !result[0] ?
                res.json({
                    status: false,
                    message: 'User does not exist!'
                }) :
                (result[0].Password === password) ?
                    res.json({
                        status: true,
                        data: result[0],
                        message: 'Successfully Logged in!'
                    }) :
                    res.json({
                        status: false,
                        message: 'Incorrect password!'
                    })
    })
})

app.post('/withdraw', (req, res, next) => {
    var FullName = req.body.name
    var pin = req.body.pin
    var amount = req.body.amount
    var query = `select * from Customers where FullName = "${FullName}"`
    // var updateBalance = `update Customers set Balance = ${-amount} WHERE FullName = "${FullName}";`
    // console.log(req.body)
    con.query(query, (err, result) => {
        err ?
            res.json({
                status: false,
                message: err.sqlMessage
            }) :
            !result[0] ?
                res.json({
                    status: false,
                    message: 'Customer does not exist!'
                }) :
                (result[0].Pin === +pin) ?

                    // con.query(query, (error, response) => {
                    // error ? console.error(error) :
                    result[0].Balance < amount ?
                        res.json({
                            status: false,
                            message: 'Insufficient funds'
                        }) :

                        res.json({
                            status: true,
                            data: `Successfully withdrawn N${amount}`
                        }) :
                    res.json({
                        status: false,
                        message: 'Incorrect pin!'
                    })
    })
})

app.listen(port, () => { console.log(`API live on port ${port}`) })