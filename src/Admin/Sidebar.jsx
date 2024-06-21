import React, { useState } from 'react';
import './Sidebar.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate()


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
      
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        
        Swal.fire({
          title: 'Logged out!',
          text: 'You have been logged out.',
          icon: 'success'
        }).then(() => {
          window.location.href = '/login';
        });
      }
    });
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <h3 className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <IoMdClose /> : <RxHamburgerMenu />}
      </h3>
      <h2 style={{ display: isOpen ? 'block' : 'none' }}>Admin Panel</h2>
      <ul style={{ display: isOpen ? 'block' : 'none' }}>
        <li>
          <NavLink to="/admin">Admin</NavLink>
        </li>
        <li>
          <NavLink to="/admin/roles">Roles</NavLink>
        </li>
        <li onClick={()=>  navigate('/admin/links')} style={{ cursor: 'pointer' }}>Links</li>
        <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
