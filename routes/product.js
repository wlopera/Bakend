const express = require('express')
const router = express.Router();

// Manejo de archivo properties
const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('config.properties');

const manager = require('./manager');

/**
 * Consulta de todos los productos
 */
router.get('/product', (req, res) => {
    manager.processGet(req, res, prop.get('query.get.product'), undefined);
});

/**
 * Consulta de producto por identificador
 */
router.get('/product/:id', (req, res) => {
    const { id } = req.params

    manager.processGet(req, res, prop.get('query.get.product.by.id'), [id]);
});

/**
 * Borrado de producto
 */
router.delete('/product/:id', (req, res) => {
    const { id } = req.params;

    manager.processQuery(req, res, prop.get('query.delete.product'), [id], prop.get('message.error.delete.product'));
});

/**
 * Agregar nuevo producto
 */
router.post('/product', (req, res) => {
    const { codigo, nombre, precio } = req.body;

    manager.processQuery(req, res, prop.get('query.post.product'), [codigo, nombre, precio], prop.get('message.error.post.product'));
});

/**
 * Actualizacion de datos de un producto
 */
router.put('/product/:id', (req, res) => {
    const { id } = req.params;
    const { codigo, nombre, precio } = req.body;

    manager.processQuery(req, res, prop.get('query.put.product'), [codigo, nombre, precio, id], prop.get('message.error.put.product'));
});

module.exports = router;