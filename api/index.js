const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Conectado'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Servir archivos estáticos (Frontend)
app.use(express.static(path.join(__dirname, '../public')));

// RUTAS DE LA API
app.use('/api/auth', require('../routes/auth.routes'));
app.use('/api/products', require('../routes/product.routes'));

// RUTAS PARA EL FRONTEND (SPA)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('/productos.html', (req, res) => res.sendFile(path.join(__dirname, '../public/productos.html')));

// Exportar para Vercel
module.exports = app;

// Solo escuchar si no estamos en Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
}