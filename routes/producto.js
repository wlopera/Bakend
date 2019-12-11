const express = require('express')
const router = express.Router();
const mysql = require('mysql')

function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'BDpranical'
    });
}

router.get('/producto', (req, res) => {
    getConnection().query('SELECT * from producto', (err, rows, fileds) => {
        res.json(rows);
    })
});


router.get('/producto/:id', (req, res) => {
    const { id } = req.params
    getConnection().query('SELECT * from producto where id = ?', [id], (err, rows, fileds) => {
        res.json(rows);
    })

});

router.delete('/producto/:id', (req, res) => {

    const connection = getConnection();
    const queryString = "DELETE from producto where id = ?";
    const { id } = req.params;

    connection.query(queryString, [id], (err, rows, fileds) => {
        if (err) {
            console.log("Fallo borrando producto: " + err);
            res.sendStatus(500);
            return;
        }
        res.json({
            code: 200,
            result: 'OK',
            message: "OK"
        });
        connection.end();
    })

});

router.post('/producto', (req, res) => {

    const connection = getConnection();
    const queryString = "INSERT INTO `producto` (`codigo`, `nombre`, `precio`) VALUES (?,?,?)";
    const { codigo, nombre, precio } = req.body;

    connection.query(queryString, [codigo, nombre, precio], (err, rows, fileds) => {
        if (err) {
            console.log("Fallo agregando producto: " + err);
            res.sendStatus(500);
            return;
        }
        res.json({
            code: 200,
            result: 'OK',
            message: "OK"
        });
        connection.end();
    })
});

router.put('/producto/:id', (req, res) => {

    const { id } = req.params;
    const connection = getConnection();
    const queryString = "UPDATE `producto` set `codigo` = ?,  `nombre` =? , `precio` = ?  WHERE id = ?";
    const { codigo, nombre, precio } = req.body;

    connection.query(queryString, [codigo, nombre, precio, id], (err, rows, fileds) => {
        if (err) {
            console.log("Fallo actualizando producto: " + err);
            res.sendStatus(500);
            return;
        }
        res.json({
            code: 200,
            result: 'OK',
            message: "OK"
        });
        connection.end();
    })

});

module.exports = router;