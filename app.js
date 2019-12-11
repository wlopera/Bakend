const express = require('express')
const app = express()
const morgan = require('morgan')
const productoRoute = require('./routes/producto')

var bodyParser = require("body-parser");
var cors = require("cors");

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());

// Settings Cors 
app.use(cors());

app.use(productoRoute);

//app.use(morgan('combined'))


app.listen(3005, () => {
    console.log("Servidor levantado en 3003...")
})