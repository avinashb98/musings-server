const mongoose = require('mongoose');
const User = require('./users');

const { Schema } = mongoose;
const MuseSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: User },
  content: String,
  createdAt: { type: Date, default: new Date() },
  lastUpdateAt: { type: Date, default: Date.now }
});

MuseSchema.post('save', () => {
  const data = this;
  data.lastUpdateAt = new Date();
});

module.exports = mongoose.model('Muse', MuseSchema);
