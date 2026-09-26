const express = require('express');
const cors = require('cors');

const app = express();

// 1. Habilitar CORS explícitamente (DEBE IR ANTES DE CUALQUIER RUTA)
app.use(cors({
  origin: '*', // Permite peticiones desde cualquier origen (incluyendo Vercel)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 2. Definición de rutas (clientes, productos, ventas, etc.)
// app.use('/clientes', clientesRouter);
// app.use('/productos', productosRouter);
// app.use('/ventas', ventasRouter);
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