const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  gender: { type: String, default: 'Female' },
  address: { type: String },
  photo: { type: String },
  isVerified: { type: Boolean, default: false },
  // OTP verification fields removed
}, { timestamps: true })

module.exports = mongoose.model('Customer', CustomerSchema)
