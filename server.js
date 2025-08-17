// livedex-api/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS para frontend local (ajusta si cambias el puerto/frontend)
app.use(cors({
  origin: [
    "http://localhost:8080",
    "http://127.0.0.1:8080"
  ]
}));
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/livedex', require('./routes/livedex'));

// MongoDB y arranque
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(5000, () => console.log('API en http://localhost:5000'));
  })
  .catch(err => console.error('Error MongoDB:', err));