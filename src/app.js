const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: true }));

const accountData = fs.readFileSync(path.join(__dirname, './json/accounts.json'),'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, './json/users.json'),'utf8');
const users = JSON.parse(userData);

app.get('/', function (req, res) {
    res.render('index',{
        title : 'Account Summary',
        accounts : accounts
    });
});

app.get('/savings', function (req, res) {
    res.render('account',{
        account : accounts.savings
    });
});

app.get('/checking', function (req, res) {
    res.render('account',{
        account : accounts.checking
    });
});

app.get('/credit', function (req, res) {
    res.render('account',{
        account : accounts.credit
    });
});

app.get('/profile', function (req, res) {
    res.render('profile',{
        user : users[0]
    });
});

app.get('/transfer', function (req, res) {
    res.render('transfer',{
    });
});

app.post('/transfer', function (req, res) {
    let tempAccounts = accounts;
    tempAccounts[req.body.from].balance = parseInt(tempAccounts[req.body.from].balance) - parseInt(req.body.amount);
    tempAccounts[req.body.to].balance = parseInt(tempAccounts[req.body.to].balance) + parseInt(req.body.amount);
    let accountsJSON = JSON.stringify(tempAccounts,null,"\t");
    fs.writeFileSync(path.join(__dirname, './json/accounts.json'),accountsJSON,'UTF8');
    res.render('transfer',{
        message: "Transfer Completed"
    });
});

app.get('/payment', function (req, res) {
    res.render('payment',{
        account : accounts.credit
    });
});

app.post('/payment', function (req, res) {
    let tempAccounts = accounts;
    console.log(accounts.credit.balance);
    tempAccounts.credit.balance = parseInt(tempAccounts.credit.balance) - parseInt(req.body.amount);
    tempAccounts.credit.available = parseInt(tempAccounts.credit.available) + parseInt(req.body.amount);
    let accountsJSON = JSON.stringify(tempAccounts,null,"\t");
    fs.writeFileSync(path.join(__dirname, './json/accounts.json'),accountsJSON,'UTF8');
    res.render('payment',{
        message: "Payment Successful",
        account : accounts.credit
    });
});

app.listen(3000, function () {
console.log('PS Project Running on port 3000!');
});

