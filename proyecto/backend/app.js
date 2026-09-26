const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
const clientesRouter = require('./routes/clientes');
const productosRouter = require('./routes/productos');
const ventasRouter = require('./routes/ventas');

app.use('/clientes', clientesRouter);
app.use('/productos', productosRouter);
app.use('/ventas', ventasRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Backend funcionando correctamente' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});