// server/src/config/db.js
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/chatapp');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Mongo connection error:', err);
  }
};
module.exports = connectDB;
