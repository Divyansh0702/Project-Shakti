const express = require('express')
const Ride = require('../models/Ride')
const Driver = require('../models/Driver')
const auth = require('../middleware/auth')

const router = express.Router()

// Request a ride (customer)
router.post('/request', auth(['customer']), async (req, res) => {
  try {
    const { pickup, drop, fare } = req.body
    // Prefer verified drivers; if none available, fall back to any available driver
    // Atomically reserve the earliest available driver to avoid double assignment
    let driver = await Driver.findOneAndUpdate(
      { isAvailable: true, isVerified: true },
      { isAvailable: false },
      { sort: { createdAt: 1 }, new: true }
    )
    if (!driver) {
      driver = await Driver.findOneAndUpdate(
        { isAvailable: true },
        { isAvailable: false },
        { sort: { createdAt: 1 }, new: true }
      )
    }
    if (!driver) return res.status(404).json({ message: 'No available drivers right now' })

    const toRad = (v) => (v * Math.PI) / 180
    let distanceKm = 0
    if (pickup?.lat && pickup?.lng && drop?.lat && drop?.lng) {
      const R = 6371
      const dLat = toRad(drop.lat - pickup.lat)
      const dLng = toRad(drop.lng - pickup.lng)
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRad(pickup.lat)) * Math.cos(toRad(drop.lat)) * Math.sin(dLng/2) * Math.sin(dLng/2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      distanceKm = R * c
    }
    const ride = await Ride.create({ customerId: req.user._id, driverId: driver._id, pickup, drop, fare, distanceKm, status: 'pending' })
    res.json({ ride, driver })
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
})

// Driver pending ride
router.get('/driver/:id/pending', auth(['driver']), async (req, res) => {
  try {
    const ride = await Ride.findOne({ driverId: req.params.id, status: 'pending' }).populate('customerId')
    res.json({ ride })
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
})

// Accept ride
router.post('/:id/accept', auth(['driver']), async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id)
    if (!ride) return res.status(404).json({ message: 'Ride not found' })
    ride.decisions = ride.decisions || []
    ride.decisions.push({ driverId: ride.driverId, decision: 'accepted', at: new Date() })
    ride.status = 'accepted'
    await ride.save()
    await Driver.findByIdAndUpdate(ride.driverId, { isAvailable: false })
    res.json({ ride })
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
})

// Reject ride
router.post('/:id/reject', auth(['driver']), async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id)
    if (!ride) return res.status(404).json({ message: 'Ride not found' })
    await Driver.findByIdAndUpdate(ride.driverId, { isAvailable: true })
    ride.decisions = ride.decisions || []
    ride.decisions.push({ driverId: ride.driverId, decision: 'rejected', at: new Date() })
    ride.driverId = null
    ride.status = 'pending'
    await ride.save()
    res.json({ ride })
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
})

router.get('/driver/:id/history', auth(['driver']), async (req, res) => {
  try {
    const driverId = String(req.user._id)
    const rides = await Ride.find({ 'decisions.driverId': driverId }).sort({ updatedAt: -1 })
    const items = []
    for (const r of rides) {
      const d = (r.decisions || []).filter(x => String(x.driverId) === driverId).slice(-1)[0]
      if (!d) continue
      items.push({
        rideId: r._id,
        decision: d.decision,
        at: d.at,
        pickup: r.pickup,
        drop: r.drop,
        fare: r.fare,
        distanceKm: r.distanceKm
      })
    }
    res.json({ history: items })
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
})

module.exports = router
