const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /ventas - Listar todas las ventas con datos del cliente
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        v.id_venta,
        v.fecha_venta,
        v.total,
        v.id_cliente,
        c.nomCliente,
        c.contacto,
        c.departamento,
        c.ciudad
      FROM ventas v
      INNER JOIN clientes c ON v.id_cliente = c.id_cliente
      ORDER BY v.id_venta
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
});

// GET /ventas/:id - Obtener una venta con su detalle
router.get('/:id', async (req, res) => {
  try {
    const [venta] = await pool.query(`
      SELECT 
        v.id_venta,
        v.fecha_venta,
        v.total,
        v.id_cliente,
        c.nomCliente
      FROM ventas v
      INNER JOIN clientes c ON v.id_cliente = c.id_cliente
      WHERE v.id_venta = ?
    `, [req.params.id]);

    if (venta.length === 0) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    const [detalle] = await pool.query(`
      SELECT 
        d.id_detalle,
        d.cantidad,
        d.precio_unitario,
        d.subtotal,
        p.id_producto,
        p.nomProducto
      FROM detalle_venta d
      INNER JOIN productos p ON d.id_producto = p.id_producto
      WHERE d.id_venta = ?
    `, [req.params.id]);

    res.json({
      ...venta[0],
      detalle
    });
  } catch (error) {
    console.error('Error al obtener venta:', error);
    res.status(500).json({ error: 'Error al obtener la venta' });
  }
});

module.exports = router;