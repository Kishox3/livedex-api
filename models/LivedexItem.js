// livedex-api/models/LivedexItem.js

const mongoose = require('mongoose');

const livedexItemSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  tipo: String,
  imagen: String, // URL opcional
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('LivedexItem', livedexItemSchema);