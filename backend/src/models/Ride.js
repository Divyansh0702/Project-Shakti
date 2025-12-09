const mongoose = require('mongoose')

const RideSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  pickup: {
    address: String,
    lat: Number,
    lng: Number,
  },
  drop: {
    address: String,
    lat: Number,
    lng: Number,
  },
  fare: { type: Number },
  distanceKm: { type: Number },
  decisions: [{
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    decision: { type: String, enum: ['accepted', 'rejected'] },
    at: { type: Date }
  }],
  status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' },
}, { timestamps: true })

module.exports = mongoose.model('Ride', RideSchema)
