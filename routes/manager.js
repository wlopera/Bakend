const express = require('express')
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
 * Permite la consulta de empresa 
 * 
 * @param req Peticion realizada 
 * @param res Respuesta a la peticion 
 * @param query Query de consulta 
 * @param params parametros requeridos por la consulta 
 */
exports.processGet = function(req, res, query, params) {

    console.log("----- Consulta de Empresa(s) -------- ")
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
 * Permite agregar, modificar o borrar  una empresa 
 * 
 * @param req Peticion realizada 
 * @param res Respuesta a la peticion 
 * @param query Query de consulta 
 * @param params parametros requeridos por la consulta 
 * @param mesage Mensaje en caso de error
 */
exports.processQuery = function(req, res, query, params, message) {

    console.log("----- Agrear/Modificar/Borrar Empresa -------- ")
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