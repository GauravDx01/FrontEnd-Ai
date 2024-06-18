import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_URL = 'http://localhost:5001/api/auth/';

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}login`, { username, password });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('role', response.data.role);
  return response.data;
};

const register = async (username, password, role) => {
  const response = await axios.post(`${API_URL}register`, { username, password, role });
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = '/login';
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

export default {
  login,
  register,
  logout,
  getCurrentUser
};
