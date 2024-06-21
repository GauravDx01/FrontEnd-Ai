import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { URL } from "../url/url";
import axios from "axios";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './AdminPanel.css';
import Swal from 'sweetalert2';

const Admin = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    fetchRoles();
    getUsers();
  }, [page]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${URL}/get-roles`);
      if (response.data && response.data.data) {
        if (userRole) {
          const adminRole = response.data.data.find(role => role.role === userRole);
          if (adminRole) {
            setPermissions(adminRole.permissions[0].permissions);
          } else {
            console.log("No admin role data found.");
          }
        } else {
          console.log("User is not an admin.");
        }
      } else {
        console.log("No data available.");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`${URL}/getAllUsers`, {
        params: {
          page: page,
          limit: itemsPerPage,
        },
      });
      if (response.data) {
        setData(response.data.data);
        setFilter(response.data.data); // Initially set filter to all users
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-user-details/${id}`);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${URL}/delete-user/${id}`);
          setData(data.filter(item => item._id !== id));
          setFilter(filter.filter(item => item._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success"
          });
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete user.",
            icon: "error"
          });
        }
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset pagination to first page when search changes
  };

  useEffect(() => {
    const filteredData = data.filter(user =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(filteredData);
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  }, [search, data]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Outlet />
      <div className="main-admin">
        <div className="sidebar-section">
          <Sidebar />
        </div>
        <div className="admin-content-section">
          <div className="head-admin">
            <h1>ADMIN PAGE</h1>
            {permissions.create ? <button className="btn1" onClick={() => navigate('/admin/user/add')}>Add +</button> : <></>}
            <div className="search-filter">
              <input
                className="search"
                placeholder="search here ..."
                type="search"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          {permissions.read ? (
            <>
              <table className="roles-table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Gender</th>
                    <th>Phone No</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filter.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item) => (
                    <tr key={item._id}>
                      <td>{item.username}</td>
                      <td>{item.gender}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.email}</td>
                      <td>
                        {permissions.update ? <span onClick={() => handleEdit(item._id)}><MdModeEditOutline /></span> : <></>}
                        {permissions.delete ? <span onClick={() => handleDelete(item._id)}><MdDelete /></span> : <></>}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tr>
                  <td colSpan={5}>
                    <div className="pagination-container">
                      <Stack spacing={2}>
                        <Pagination
                          count={totalPages}
                          page={page}
                          onChange={handlePageChange}
                          color="primary"
                        />
                      </Stack>
                    </div>
                  </td>
                </tr>
              </table>
            </>
          ) : <></>}
        </div>
      </div>
    </div>
  );
};

export default Admin;
