import React, { useState } from 'react';
import './Sidebar.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <h3 className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <IoMdClose /> : <RxHamburgerMenu />}
      </h3>
      <h2 style={{ display: isOpen ? 'block' : 'none' }}>Admin Panel</h2>
      <ul style={{ display: isOpen ? 'block' : 'none' }}>
        <li >
          <NavLink to="/admin" >Dashboard</NavLink>
        </li>
        
        <li>
          <NavLink to="/admin/roles">Roles</NavLink>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
