const express = require('express')
const Driver = require('../models/Driver')
const auth = require('../middleware/auth')

const router = express.Router()

// Update driver location and availability
router.post('/me/status', auth(['driver']), async (req, res) => {
  try {
    const { isAvailable, location } = req.body
    const driver = await Driver.findByIdAndUpdate(req.user._id, {
      ...(typeof isAvailable === 'boolean' ? { isAvailable } : {}),
      ...(location ? { location } : {}),
    }, { new: true })
    res.json({ driver })
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
})

module.exports = router

