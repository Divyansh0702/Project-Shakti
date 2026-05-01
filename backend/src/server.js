const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const app = express();

app.use(cors());
app.use(express.json());

console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Loaded ✅" : "Missing ❌");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded ✅" : "Missing ❌");

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/admin', express.static(path.resolve(__dirname, '../../admin')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/rides', require('./routes/rides'));
app.use('/api/verification', require('./routes/verification'));
app.use('/api/driver', require('./routes/driver'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is not defined");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

startServer();