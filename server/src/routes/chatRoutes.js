// server/src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { getRooms, getMessages } = require('../controllers/chatController');

router.get('/rooms', getRooms);
router.get('/messages/:roomId', getMessages);

module.exports = router;