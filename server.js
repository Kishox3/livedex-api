// livedex-api/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/livedex', require('./routes/livedex'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(5000, '0.0.0.0', () => console.log('API en http://0.0.0.0:5000'));
  })
  .catch(err => console.error('Error MongoDB:', err));
