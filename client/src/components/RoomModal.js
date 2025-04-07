import React, { useState } from 'react';
import axios from 'axios';

export default function RoomModal({ onClose, onCreated }) {
  const [name, setName] = useState('');
  const [isGroup, setIsGroup] = useState(true);

  const createRoom = async () => {
    await axios.post('/api/chat/rooms', { name, isGroup });
    onCreated();
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 100, left: '30%', padding: 20, backgroundColor: '#fff', border: '1px solid #000' }}>
      <h3>Create Room</h3>
      <input placeholder="Room name" onChange={(e) => setName(e.target.value)} />
      <label>
        <input type="checkbox" checked={isGroup} onChange={() => setIsGroup(!isGroup)} />
        Group Room
      </label>
      <br />
      <button onClick={createRoom}>Create</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
