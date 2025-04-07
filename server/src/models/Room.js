// server/src/models/Room.js
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isGroup: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);