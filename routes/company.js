const express = require('express')
const router = express.Router();

// Manejo de archivo properties
const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('config.properties');

const manager = require('./manager');

/**
 * Consulta de todos las empresas
 */
router.get('/company', (req, res) => {
    manager.processGet(req, res, prop.get('query.get.company'), undefined);
});

/**
 * Consulta de empesa por identificador
 */
router.get('/company/:id', (req, res) => {
    const { id } = req.params

    manager.processGet(req, res, prop.get('query.get.company.by.id'), [id]);
});

/**
 * Borrado de una empresa
 */
router.delete('/company/:id', (req, res) => {
    const { id } = req.params;

    manager.processQuery(req, res, prop.get('query.delete.company'), [id], prop.get('message.error.delete.company'));
});

/**
 * Agregar nueva empresa
 */
router.post('/company', (req, res) => {
    const { codigo, nombre, direccion } = req.body;

    manager.processQuery(req, res, prop.get('query.post.company'), [codigo, nombre, direccion], prop.get('message.error.post.company'));
});

/**
 * Actualizacion de datos de una empresa
 */
router.put('/company/:id', (req, res) => {
    const { id } = req.params;
    const { codigo, nombre, direccion } = req.body;

    manager.processQuery(req, res, prop.get('query.put.company'), [codigo, nombre, direccion, id], prop.get('message.error.put.company'));
});

module.exports = router;