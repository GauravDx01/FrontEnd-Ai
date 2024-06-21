import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import authService from './Components/services/authService';
import Ai from './Components/Ai';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Role from './Admin/Roles/Role';
import Admin from './Admin/Admin';
import EditRole from './Admin/Roles/EditRole';
import AddRoles from './Admin/Roles/AddRoles';
import PrivateRoute from '../src/Private/PrivateRoute'; // Import the PrivateRoute component
import './App.css';
import AddUser from './Admin/AddAdmin/AddUser';
import EditUser from './Admin/AddAdmin/EditUser';
import Links from './Admin/Links/Links';

function App() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      authService.checkTokenExpiration();
    }, 1000 * 60); // Check every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Ai />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute element={Admin} />} />
        <Route path="/admin/roles" element={<PrivateRoute element={Role} />} />
        <Route path="/admin/links" element={<PrivateRoute element={Links} />} />
        <Route path="/admin/roles/edit/:id" element={<PrivateRoute element={EditRole} />} />
        <Route path="/admin/roles/add" element={<PrivateRoute element={AddRoles} />} />
        <Route path="/admin/user/add" element={<PrivateRoute element={AddUser} />} />
        <Route path="/edit-user-details/:id" element={<PrivateRoute element={EditUser} />} />
      
      </Routes>
    </div>
  );
}

export default App;
