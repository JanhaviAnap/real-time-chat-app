// server/src/index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Connect to DB
connectDB();

// Socket.io
io.on('connection', socket => {
  console.log('Socket connected:', socket.id);

  socket.on('joinRoom', ({ roomId, userId }) => {
    socket.join(roomId);
    io.to(roomId).emit('userJoined', { userId });
  });

  socket.on('sendMessage', (msg) => {
    io.to(msg.roomId).emit('newMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));