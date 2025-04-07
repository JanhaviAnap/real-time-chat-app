import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage({ onRegister }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleRegister = async () => {
    try {
      await axios.post('/api/auth/register', form);
      onRegister();
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
