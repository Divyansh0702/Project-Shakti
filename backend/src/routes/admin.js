const express = require('express')
const Customer = require('../models/Customer')
const Driver = require('../models/Driver')
const adminAuth = require('../middleware/adminAuth')

const router = express.Router()

// List customers (exclude password)
router.get('/customers', adminAuth, async (req, res) => {
  try {
    const customers = await Customer.find().select('-password')
    res.json({ success: true, customers })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// List drivers (exclude password)
router.get('/drivers', adminAuth, async (req, res) => {
  try {
    const drivers = await Driver.find().select('-password')
    res.json({ success: true, drivers })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Update customer details
router.put('/customers/:id', adminAuth, async (req, res) => {
  try {
    const { name, email, phone, gender, address, isVerified } = req.body || {}
    const updates = {}
    if (typeof name === 'string') updates.name = name
    if (typeof email === 'string') updates.email = email
    if (typeof phone === 'string') updates.phone = phone
    if (typeof gender === 'string') updates.gender = gender
    if (typeof address === 'string') updates.address = address
    if (typeof isVerified === 'boolean') updates.isVerified = isVerified
    const customer = await Customer.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password')
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' })
    res.json({ success: true, customer })
  } catch (err) {
    const dup = err?.code === 11000
    res.status(dup ? 409 : 500).json({ success: false, message: dup ? 'Duplicate value' : 'Server error' })
  }
})

// Update driver details
router.put('/drivers/:id', adminAuth, async (req, res) => {
  try {
    const { name, email, phone, gender, vehicleNumber, vehicleModel, isVerified } = req.body || {}
    const updates = {}
    if (typeof name === 'string') updates.name = name
    if (typeof email === 'string') updates.email = email
    if (typeof phone === 'string') updates.phone = phone
    if (typeof gender === 'string') updates.gender = gender
    if (typeof vehicleNumber === 'string') updates.vehicleNumber = vehicleNumber
    if (typeof vehicleModel === 'string') updates.vehicleModel = vehicleModel
    if (typeof isVerified === 'boolean') updates.isVerified = isVerified
    const driver = await Driver.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password')
    if (!driver) return res.status(404).json({ success: false, message: 'Driver not found' })
    res.json({ success: true, driver })
  } catch (err) {
    const dup = err?.code === 11000
    res.status(dup ? 409 : 500).json({ success: false, message: dup ? 'Duplicate value' : 'Server error' })
  }
})

module.exports = router

