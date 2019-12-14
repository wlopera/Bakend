const express = require('express')
const router = express.Router();
const mysql = require('mysql')

// Manejo de archivo properties
const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('config.properties');

/**
 * Conexion a BD
 */
function getConnection() {
    return mysql.createConnection({
        host: prop.get('mysql.host'),
        user: prop.get('mysql.user'),
        database: prop.get('mysql.database')
    });
}

/**
 * Consulta de todos los productos
 */
router.get('/product', (req, res) => {
    processGet(req, res, prop.get('query.get.product'), undefined);
});

/**
 * Vonsulta de producto por identificador
 */
router.get('/product/:id', (req, res) => {
    const { id } = req.params
    processGet(req, res, prop.get('query.get.product.by.id'), [id]);

});

/**
 * Borrado de producto
 */
router.delete('/product/:id', (req, res) => {
    const { id } = req.params;
    processQuery(req, res, prop.get('query.delete.product'), [id], prop.get('message.error.delete.product'));
});

/**
 * Agregar nuevo producto
 */
router.post('/product', (req, res) => {
    const { codigo, nombre, precio } = req.body;
    processQuery(req, res, prop.get('query.post.product'), [codigo, nombre, precio], prop.get('message.error.post.product'));
});

/**
 * Actualizacion de datos de un producto
 */
router.put('/product/:id', (req, res) => {
    const { id } = req.params;
    const { codigo, nombre, precio } = req.body;

    processQuery(req, res, prop.get('query.put.product'), [codigo, nombre, precio, id], prop.get('message.error.put.product'));
});

/**
 * Permite la consulta de productos 
 * 
 * @param req Peticion realizada 
 * @param res Respuesta a la peticion 
 * @param query Query de consulta 
 * @param params parametros requeridos por la consulta 
 */
function processGet(req, res, query, params) {

    console.log("----- Consulta de Producto(s) -------- ")
    console.log("query: " + query)
    console.log("params: " + params)
    console.log("-------------------------------------- ")
    const connection = getConnection();
    connection.query(query, params, (err, rows, fields) => {
        res.json(rows);
    })
    connection.end();
}

/**
 * Permite agregar, modificar o borrar  un producto 
 * 
 * @param req Peticion realizada 
 * @param res Respuesta a la peticion 
 * @param query Query de consulta 
 * @param params parametros requeridos por la consulta 
 * @param mesage Mensaje en caso de error
 */
function processQuery(req, res, query, params, message) {

    console.log("----- Agrear/Modificar/Borrar Producto -------- ")
    console.log("query: " + query)
    console.log("params: " + params)
    console.log("message-error: " + message)
    console.log("----------------------------------------------- ")

    const connection = getConnection();
    connection.query(query, params, (err, rows, fields) => {
        if (err) {
            console.log(message + err);
            res.sendStatus(500);
        } else {
            res.json({
                code: 200,
                result: 'OK',
                message: "Exito.!"
            });
        }
        connection.end();

    })
}

module.exports = router;