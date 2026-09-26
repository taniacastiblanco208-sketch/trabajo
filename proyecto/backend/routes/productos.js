const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET todos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos ORDER BY id_producto');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener juegos' });
  }
});

// POST - Añadir
router.post('/', async (req, res) => {
  try {
    const { nomProducto, cantidad, precio } = req.body;
    const [result] = await pool.query(
      'INSERT INTO productos (nomProducto, cantidad, precio) VALUES (?, ?, ?)',
      [nomProducto, cantidad, precio]
    );
    res.json({ id_producto: result.insertId, nomProducto, cantidad, precio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear juego' });
  }
});

// PUT - Editar
router.put('/:id', async (req, res) => {
  try {
    const { nomProducto, cantidad, precio } = req.body;
    await pool.query(
      'UPDATE productos SET nomProducto=?, cantidad=?, precio=? WHERE id_producto=?',
      [nomProducto, cantidad, precio, req.params.id]
    );
    res.json({ mensaje: 'Juego actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar juego' });
  }
});

// DELETE - Eliminar
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM productos WHERE id_producto = ?', [req.params.id]);
    res.json({ mensaje: 'Juego eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar juego' });
  }
});

module.exports = router;