const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Muse = require('./muses');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  muses: [{ref: Muse, type: mongoose.Schema.Types.ObjectId}],
  password:String,
  location: String,
  lastUpdateAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', () => {
  let data = this;
  data.lastUpdateAt = new Date();
});

module.exports = mongoose.model('User', UserSchema);
