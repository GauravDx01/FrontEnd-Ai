import React from "react";
import Ai from "./Components/Ai";
import FetchDataForm from "./Components/FetchDataForm";
import ScrapLink from "./Scrap/ScrapLink";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import SuperAdminPage from "./SuperAdmin/SuperAdmin";
// import AdminPage from "./Admin/Admin";
import authService from "./Components/services/authService";
import Role from "./Admin/Roles/Role";
import Admin from "./Admin/Admin";
import { GrDashboard } from "react-icons/gr";
import './App.css'
import EditRole from "./Admin/Roles/EditRole";
import AddRoles from "./Admin/Roles/AddRoles";
function App() {
  const user = authService.getCurrentUser();
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Ai />} />
        <Route path="/register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/admin">
        <Route index element = {<Admin/>} />
        <Route  path = 'roles' element = {<Role/>} />
        <Route  path = 'roles/edit/:id' element = {<EditRole/>} />
        <Route  path = 'roles/add' element = {<AddRoles/>} />
        
        
        
        </Route>
      </Routes>
    </div>
  );
}

export default App;

// import React from 'react'
// import Ai from './Components/Ai'

// function App() {
//   return (
//     <div>
//       <Ai/>
//     </div>
//   )
// }

// export default App
