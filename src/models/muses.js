const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./users');
const MuseSchema = new Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: User},
  content: String,
  createdAt: {type: Date, default: new Date()},
  lastUpdateAt: { type: Date, default: Date.now }
});

MuseSchema.post('save', function() {
  let data = this;
  data.lastUpdateAt = new Date();
});

module.exports = mongoose.model('Muse', MuseSchema);
