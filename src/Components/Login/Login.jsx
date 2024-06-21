import React, { useState } from 'react';
import authService from '../services/authService';
import Swal from 'sweetalert2';
import './login.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.login(username, password);
      if (user) {
        window.location.href = '/admin';
      }
    } catch (error) {
      // Error handling is done in authService
    }
  };

  return (
    <div className="login-container">
     
      <form className="login-form" onSubmit={handleLogin}>
      <h2 className="login-title">Login</h2>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          required 
          className="login-input"
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
