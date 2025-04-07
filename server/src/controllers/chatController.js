// server/src/controllers/chatController.js
const Room = require('../models/Room');
const Message = require('../models/Message');

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ roomId: req.params.roomId });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};