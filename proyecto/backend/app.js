const express = require('express');
const cors = require('cors');

const app = express();

// 1. CORS debe ir en la parte superior con origen permitido
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 2. Revisa si tus rutas están con /api o directas
// SI EN TU CÓDIGO TIENES:
// app.use('/api/clientes', clientesRoutes);
// ASEGÚRATE DE QUE COINCIDA CON LO QUE PIDE EL FRONTEND.
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

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Definir el puerto asignado por Railway o usar el 3000 por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend corriendo en http://0.0.0.0:${PORT}`);
});