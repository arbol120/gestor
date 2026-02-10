const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 👉 SERVIR ARCHIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, '../public')));

/* =====================
   MOCK DATA
===================== */
let users = [{ id: 1, username: 'admin', password: '1234' }];
let products = [];

/* =====================
   AUTH MIDDLEWARE
===================== */
function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token' });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ msg: 'Token inválido' });
  }
}

/* =====================
   AUTH
===================== */
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) return res.status(401).json({ msg: 'Credenciales incorrectas' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
});

/* =====================
   PRODUCTS
===================== */
app.get('/api/products', auth, (req, res) => {
  res.json(products);
});

/* =====================
   FRONTEND ROUTES
===================== */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

module.exports = app;
