const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  gender: { type: String, default: 'Female' },
  address: { type: String },
  vehicleNumber: { type: String },
  vehicleModel: { type: String },
  // license uploaded file stored in verificationFiles
  isAvailable: { type: Boolean, default: true },
  location: { lat: { type: Number }, lng: { type: Number } },
  isVerified: { type: Boolean, default: false },
  verificationFiles: [{ filename: String, path: String }],
  // OTP verification fields
  otpCode: { type: String },
  otpExpires: { type: Date },
  isPhoneVerified: { type: Boolean, default: false },
  lastOtpSentAt: { type: Date },
  otpResendCount: { type: Number, default: 0 },
  otpWindowStart: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('Driver', DriverSchema)
