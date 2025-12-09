const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const auth = require('../middleware/auth')
const Driver = require('../models/Driver')

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../../uploads/verification', req.user._id.toString())
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, unique + '-' + file.originalname)
  }
})

const upload = multer({ storage })

// Driver uploads license/ID for verification
router.post('/upload', auth(['driver']), upload.array('files', 5), async (req, res) => {
  try {
    const files = (req.files || []).map(f => ({ filename: f.filename, path: f.path }))
    const driver = await Driver.findByIdAndUpdate(req.user._id, {
      $push: { verificationFiles: { $each: files } },
      isVerified: true // In real app, set pending and add admin approval flow
    }, { new: true })
    res.json({ message: 'Uploaded', files, driver })
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
})

module.exports = router

