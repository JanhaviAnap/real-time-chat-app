import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isRegistering, setIsRegistering] = useState(false);

  if (!isLoggedIn) {
    return isRegistering ? (
      <>
        <RegisterPage onRegister={() => setIsRegistering(false)} />
        <p>
          Already have an account? <button onClick={() => setIsRegistering(false)}>Login</button>
        </p>
      </>
    ) : (
      <>
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
        <p>
          No account? <button onClick={() => setIsRegistering(true)}>Register</button>
        </p>
      </>
    );
  }

  return <ChatPage />;
}

export default App;
