const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Customer = require('../models/Customer')
const Driver = require('../models/Driver')
const authMw = require('../middleware/auth')

// ----- Upload storage setup (licenses + profile photos) -----
const uploadsRoot = path.join(__dirname, '../../uploads')
const licensesDir = path.join(uploadsRoot, 'driver-licenses')
const photosDir = path.join(uploadsRoot, 'profile-photos')
try { fs.mkdirSync(licensesDir, { recursive: true }) } catch {}
try { fs.mkdirSync(photosDir, { recursive: true }) } catch {}

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const dest = file.fieldname === 'license' ? licensesDir : photosDir
    cb(null, dest)
  },
  filename: (_req, file, cb) => {
    const ts = Date.now()
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')
    cb(null, `${ts}-${safe}`)
  }
})
const upload = multer({ storage })

// Only apply multer when the request is multipart; otherwise let JSON parser handle
const maybeUploadPhoto = (req, res, next) => {
  const ct = req.headers['content-type'] || ''
  if (ct.includes('multipart/form-data')) {
    return upload.single('photo')(req, res, next)
  }
  next()
}

// Firebase phone/OTP verification removed. No OTP helpers required.

// Minimal stub endpoints to satisfy frontend during development.
// Replace with real authentication (JWT/password hashing) when ready.

router.post('/login', (req, res) => {
  const { role = 'customer', name = 'User' } = req.body || {}
  // Issue a dummy token for dev purposes only
  res.json({
    success: true,
    token: 'dev-token',
    user: { name, role },
    message: 'Login stub: replace with real auth later',
  })
})

router.post('/logout', (_req, res) => {
  res.json({ success: true })
})

router.post('/register', (_req, res) => {
  res.status(501).json({
    success: false,
    message: 'Registration not implemented yet',
  })
})

router.get('/health', (_req, res) => {
  res.json({ ok: true })
})

module.exports = router

/**
 * ---------- Customer Auth ----------
 */
router.post('/customer/register', upload.single('photo'), async (req, res) => {
  try {
    console.log('[customer.register] content-type:', req.headers['content-type'])
    console.log('[customer.register] body keys:', Object.keys(req.body || {}))
    const { name, email, password, phone, gender } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' })
    }
    // Block if email already exists
    const existingByEmail = await Customer.findOne({ email })
    if (existingByEmail) {
      return res.status(409).json({ success: false, message: 'Account already registered!' })
    }
    // Enforce phone uniqueness among customers AND drivers (global phone uniqueness)
    if (phone && typeof phone === 'string') {
      const existingCustomerByPhone = await Customer.findOne({ phone })
      if (existingCustomerByPhone) {
        return res.status(409).json({ success: false, message: 'Account already registered!' })
      }
      const existingDriverByPhone = await Driver.findOne({ phone })
      if (existingDriverByPhone) {
        return res.status(409).json({ success: false, message: 'Account already registered!' })
      }
    }
    // Create new customer record
    const photoPath = req.file ? `/uploads/profile-photos/${req.file.filename}` : null
    const hashed = await bcrypt.hash(password, 10)
    const customer = new Customer({
      name,
      email,
      password: hashed,
      phone,
      gender,
      ...(photoPath ? { photo: photoPath } : {}),
    })
    await customer.save()
    return res.json({ success: true, message: 'Customer created.' })
  } catch (err) {
    console.error('customer register error', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})


router.post('/customer/login', maybeUploadPhoto, async (req, res) => {
  try {
    console.log('[customer.login] content-type:', req.headers['content-type'])
    console.log('[customer.login] body keys:', Object.keys(req.body || {}))
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' })
    }
    const customer = await Customer.findOne({ email })
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Account not found' })
    }

    let valid = false
    try { valid = await bcrypt.compare(password, customer.password) } catch {}
    if (!valid) {
      // backward compatibility: allow exact plaintext match and rehash
      if (customer.password === password) {
        try {
          customer.password = await bcrypt.hash(password, 10)
          await customer.save()
          valid = true
        } catch {}
      }
    }
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    // If selfie photo provided during login, refresh stored photo
    if (req.file) {
      const photoPath = `/uploads/profile-photos/${req.file.filename}`
      customer.photo = photoPath
      await customer.save()
    }

    const payload = { _id: customer._id, role: 'customer', email: customer.email, name: customer.name }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
    return res.json({ success: true, token, user: { name: customer.name, role: 'customer', email: customer.email, _id: customer._id } })
  } catch (err) {
    console.error('customer login error', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Update customer profile (email, phone)
router.put('/customer/me', authMw(['customer']), async (req, res) => {
  try {
    const { email, phone } = req.body || {}
    const updates = {}
    if (typeof email === 'string' && email.trim()) updates.email = email.trim()
    if (typeof phone === 'string' && phone.trim()) updates.phone = phone.trim()
    if (!Object.keys(updates).length) {
      return res.status(400).json({ success: false, message: 'No valid fields to update' })
    }
    const customer = await Customer.findByIdAndUpdate(req.user._id, updates, { new: true })
    if (!customer) return res.status(404).json({ success: false, message: 'Account not found' })
    return res.json({ success: true, user: { _id: customer._id, name: customer.name, email: customer.email, phone: customer.phone, role: 'customer' } })
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ success: false, message: 'Email already in use' })
    }
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

/**
 * ---------- Driver Auth ----------
 */
// Upload storage is configured above to handle both 'license' and 'photo'

router.post('/driver/register', upload.fields([{ name: 'license', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), async (req, res) => {
  try {
    console.log('[driver.register] content-type:', req.headers['content-type'])
    console.log('[driver.register] body keys:', Object.keys(req.body || {}))
    const { name, email, password, phone, gender, vehicleNumber, vehicleModel } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' })
    }
    const licensePath = (req.files && req.files.license && req.files.license[0]) ? `/uploads/driver-licenses/${req.files.license[0].filename}` : null
    const photoPath = (req.files && req.files.photo && req.files.photo[0]) ? `/uploads/profile-photos/${req.files.photo[0].filename}` : null
    // Block if email already exists
    const existingByEmail = await Driver.findOne({ email })
    if (existingByEmail) {
      return res.status(409).json({ success: false, message: 'Email already in use' })
    }
    // Enforce phone uniqueness among drivers AND customers (global phone uniqueness)
    if (phone && typeof phone === 'string') {
      const existingDriverByPhone = await Driver.findOne({ phone })
      if (existingDriverByPhone) {
        return res.status(409).json({ success: false, message: 'Phone already in use' })
      }
      const existingCustomerByPhone = await Customer.findOne({ phone })
      if (existingCustomerByPhone) {
        return res.status(409).json({ success: false, message: 'Phone already in use' })
      }
    }
    // Create new driver record
    const hashed = await bcrypt.hash(password, 10)
    const driver = new Driver({
      name,
      email,
      password: hashed,
      phone,
      gender,
      vehicleNumber,
      vehicleModel,
      ...(photoPath ? { photo: photoPath } : {}),
      // license path is returned separately
    })
    await driver.save()
    return res.json({ success: true, message: 'Driver created.', licensePath })
  } catch (err) {
    console.error('driver register error', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

router.post('/driver/login', maybeUploadPhoto, async (req, res) => {
  try {
    console.log('[driver.login] content-type:', req.headers['content-type'])
    console.log('[driver.login] body keys:', Object.keys(req.body || {}))
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' })
    }
    const driver = await Driver.findOne({ email })
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Account not found' })
    }

    let valid = false
    try { valid = await bcrypt.compare(password, driver.password) } catch {}
    if (!valid) {
      // backward compatibility: allow exact plaintext match and rehash
      if (driver.password === password) {
        try {
          driver.password = await bcrypt.hash(password, 10)
          await driver.save()
          valid = true
        } catch {}
      }
    }
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    // If selfie photo provided during login, refresh stored photo
    if (req.file) {
      const photoPath = `/uploads/profile-photos/${req.file.filename}`
      driver.photo = photoPath
      await driver.save()
    }

    const payload = { _id: driver._id, role: 'driver', email: driver.email, name: driver.name }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
    return res.json({ success: true, token, user: { name: driver.name, role: 'driver', email: driver.email, _id: driver._id } })
  } catch (err) {
    console.error('driver login error', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Update driver profile (email, phone)
router.put('/driver/me', authMw(['driver']), async (req, res) => {
  try {
    const { email, phone } = req.body || {}
    const updates = {}
    if (typeof email === 'string' && email.trim()) updates.email = email.trim()
    if (typeof phone === 'string' && phone.trim()) updates.phone = phone.trim()
    if (!Object.keys(updates).length) {
      return res.status(400).json({ success: false, message: 'No valid fields to update' })
    }
    const driver = await Driver.findByIdAndUpdate(req.user._id, updates, { new: true })
    if (!driver) return res.status(404).json({ success: false, message: 'Account not found' })
    return res.json({ success: true, user: { _id: driver._id, name: driver.name, email: driver.email, phone: driver.phone, role: 'driver' } })
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ success: false, message: 'Email already in use' })
    }
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})
