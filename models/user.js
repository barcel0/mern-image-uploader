const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  favouriteNumber: { type: Number, required: true },
  colour: { type: String, trim: true, required: true },
  avatar: { type: String, trim: true, required: true },
  gallery: { type: [String], trim: true, required: false }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);