// livdex-api/routes/livedex.js

const express = require('express');
const jwt = require('jsonwebtoken');
const LivedexItem = require('../models/LivedexItem');

const router = express.Router();

// Middleware para validar JWT
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token' });
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// Crear
router.post('/', auth, async (req, res) => {
  const item = await LivedexItem.create({ ...req.body, user: req.userId });
  res.status(201).json(item);
});

// Listar todos del usuario
router.get('/', auth, async (req, res) => {
  const items = await LivedexItem.find({ user: req.userId });
  res.json(items);
});

// Editar
router.put('/:id', auth, async (req, res) => {
  const item = await LivedexItem.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  res.json(item);
});

// Eliminar
router.delete('/:id', auth, async (req, res) => {
  const item = await LivedexItem.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  res.json({ mensaje: 'Eliminado' });
});

module.exports = router;