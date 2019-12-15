const express = require('express')
const app = express()
const morgan = require('morgan')
const productRoute = require('./routes/product')
const companyRoute = require('./routes/company')

// Manejo de archivo properties
const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('config.properties');

var bodyParser = require("body-parser");
var cors = require("cors");

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());

// Settings Cors 
app.use(cors());

// Agregar repo - productos
app.use(productRoute);

// Agregar repo - empress
app.use(companyRoute);

app.listen(prop.get('server.port'), () => {
    console.log(prop.get('server.message'))
})