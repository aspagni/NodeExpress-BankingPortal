const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const data = require('../src/data');

const app = express();
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: true }));

const users = data.users;
const accounts = data.accounts;
const writeJSON = data.writeJSON;
const accountRoutes = require('../src/routes/accounts');
const servicesRoutes = require('../src/routes/services');

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/', function (req, res) {
    res.render('index',{
        title : 'Account Summary',
        accounts : accounts
    });
});



app.get('/profile', function (req, res) {
    res.render('profile',{
        user : data.users[0]
    });
});

app.listen(3000, function () {
console.log('PS Project Running on port 3000!');
});

