// livedex-api/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Faltan datos' });
    if (await User.findOne({ email })) return res.status(400).json({ error: 'Ya existe ese usuario' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });
    res.status(201).json({ mensaje: 'Usuario creado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Credenciales incorrectas' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Credenciales incorrectas' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;