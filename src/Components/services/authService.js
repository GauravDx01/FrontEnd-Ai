import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:5001/api/auth';

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, { username, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    Swal.fire({
      title: 'Login Failed',
      text: error.response ? error.response.data.message : 'An error occurred during login. Please try again.',
      icon: 'error'
    });
    throw error; // Re-throw to handle it further up the call stack if needed
  }
};

const register = async (username, password, role) => {
  try {
    const response = await axios.post(`${API_URL}register`, { username, password, role });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response ? error.response.data : error.message);
    Swal.fire({
      title: 'Registration Failed',
      text: error.response ? error.response.data.message : 'An error occurred during registration. Please try again.',
      icon: 'error'
    });
    throw error;
  }
};

const logout = () => {
  Swal.fire({
    title: 'Session Expired',
    text: 'Your session has expired. Please log in again.',
    icon: 'warning'
  }).then(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  });
};

const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logout();
        return null;
      }
      return decoded;
    } catch (error) {
      logout();
      return null;
    }
  }
  return null;
};

const checkTokenExpiration = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logout();
      }
    } catch (error) {
      logout();
    }
  }
};

export default {
  login,
  register,
  logout,
  getCurrentUser,
  checkTokenExpiration
};
