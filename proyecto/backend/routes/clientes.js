const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET todos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes ORDER BY id_cliente');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener jugadores' });
  }
});

// POST - Añadir
router.post('/', async (req, res) => {
  try {
    const { nomCliente, contacto, departamento, ciudad } = req.body;
    const [result] = await pool.query(
      'INSERT INTO clientes (nomCliente, contacto, departamento, ciudad) VALUES (?, ?, ?, ?)',
      [nomCliente, contacto, departamento, ciudad]
    );
    res.json({ id_cliente: result.insertId, nomCliente, contacto, departamento, ciudad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear jugador' });
  }
});

// PUT - Editar
router.put('/:id', async (req, res) => {
  try {
    const { nomCliente, contacto, departamento, ciudad } = req.body;
    await pool.query(
      'UPDATE clientes SET nomCliente=?, contacto=?, departamento=?, ciudad=? WHERE id_cliente=?',
      [nomCliente, contacto, departamento, ciudad, req.params.id]
    );
    res.json({ mensaje: 'Jugador actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar jugador' });
  }
});

// DELETE - Eliminar
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [req.params.id]);
    res.json({ mensaje: 'Jugador eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar jugador' });
  }
});

module.exports = router;