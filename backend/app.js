const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const routes = require('./routes/routes');
const routesAuth = require('./routes/routesAuth');
const path = require('path');

const user= process.env.USER_SECRET;
const password= process.env.PASSWORD_SECRET;
const url = process.env.URL_SECRET;
                   
mongoose.connect('mongodb+srv://'+user+':'+password+'@'+url+'.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use('/api/sauces', routes);
app.use('/api/auth', routesAuth);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;

