const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use('/admin', express.static(path.resolve(__dirname, '../../admin')))

 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/rides', require('./routes/rides'))
app.use('/api/verification', require('./routes/verification'))
app.use('/api/driver', require('./routes/driver'))
app.use('/api/admin', require('./routes/admin'))

const PORT = process.env.PORT || 5000
const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/shakti'

mongoose.connect(MONGO).then(() => {
  console.log('MongoDB connected')
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))
}).catch((err) => {
  console.error('MongoDB connection error', err)
})
