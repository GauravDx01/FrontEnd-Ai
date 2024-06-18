import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard'
const Admin = () => {
  return (
    <div>
      <Outlet/>
      <div className="main-admin">
        <div className="sidebar-section">
        <Sidebar/>
        </div>
        <div className="admin-content-section">
       <Dashboard/>

        </div>
        
      </div>

      
    </div>
  );
};

export default Admin;
