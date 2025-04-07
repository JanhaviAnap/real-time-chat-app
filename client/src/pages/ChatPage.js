import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import RoomModal from '../components/RoomModal';

const handleLogout = () => {
  localStorage.removeItem('token'); // remove JWT
  window.location.href = '/'; // redirect to login
};

const socket = io('http://localhost:5000');

export default function ChatPage() {
  const [rooms, setRooms] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (currentRoomId) {
      socket.emit('joinRoom', { roomId: currentRoomId });
      axios.get(`/api/chat/messages/${currentRoomId}`).then(res => setMessages(res.data));
    }
  }, [currentRoomId]);

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      if (msg.roomId === currentRoomId) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    return () => socket.off('newMessage');
  }, [currentRoomId]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/'; // redirect if not logged in
    }
  }, []);

  const fetchRooms = async () => {
    const res = await axios.get('/api/chat/rooms');
    setRooms(res.data);
  };

  const sendMessage = () => {
    const msg = { content: input, roomId: currentRoomId };
    socket.emit('sendMessage', msg);
    setInput('');
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 200, borderRight: '1px solid gray' }}>
        <h3>Rooms</h3>
        <button onClick={handleLogout} style={{ marginBottom: 10, color: 'red' }}>Logout</button>
        <button onClick={() => setShowModal(true)}>+ New Room</button>
        {rooms.map((room) => (
          <div key={room._id} onClick={() => setCurrentRoomId(room._id)} style={{ cursor: 'pointer' }}>
            {room.name}
          </div>
        ))}
      </div>

      <div style={{ padding: 20, flex: 1 }}>
        {currentRoomId ? (
          <>
            <div style={{ height: 400, overflowY: 'scroll', border: '1px solid #ccc' }}>
              {messages.map((msg, i) => (
                <div key={i}>{msg.content}</div>
              ))}
            </div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
          </>
        ) : (
          <p>Select a room</p>
        )}
      </div>

      {showModal && <RoomModal onClose={() => setShowModal(false)} onCreated={fetchRooms} />}
    </div>
  );
}
