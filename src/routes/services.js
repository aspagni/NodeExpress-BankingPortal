const express = require('express');
const {accounts, writeJSON} = require('../data');

const router = express.Router();

router.get('/transfer', function (req, res) {
    res.render('transfer',{
    });
});

router.post('/transfer', function (req, res) {
    let tempAccounts = accounts;
    tempAccounts[req.body.from].balance = parseInt(tempAccounts[req.body.from].balance) - parseInt(req.body.amount);
    tempAccounts[req.body.to].balance = parseInt(tempAccounts[req.body.to].balance) + parseInt(req.body.amount);
    writeJSON(tempAccounts);
    res.render('transfer',{
        message: "Transfer Completed"
    });
});

router.get('/payment', function (req, res) {
    res.render('payment',{
        account : accounts.credit
    });
});

router.post('/payment', function (req, res) {
    let tempAccounts = accounts;
    tempAccounts.credit.balance = parseInt(tempAccounts.credit.balance) - parseInt(req.body.amount);
    tempAccounts.credit.available = parseInt(tempAccounts.credit.available) + parseInt(req.body.amount);
    writeJSON(tempAccounts);
    res.render('payment',{
        message: "Payment Successful",
        account : accounts.credit
    });
});

module.exports = router;