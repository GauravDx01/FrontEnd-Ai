import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./role.css"; // Ensure you create and import this CSS file
import { URL } from "../../url/url";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

function Role() {
  const [roles, setRoles] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
  }, [page]); // Reload roles when page changes

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${URL}/get-roles`, {
        params: {
          page: page,
          limit: itemsPerPage,
        },
      });
      if (response.data) {
        setRoles(response.data.data);
        setFilter(response.data.data); // Initially set filter to all roles
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleEditRole = (id) => {
    navigate(`/admin/roles/edit/${id}`);
  };

  const handleDeleteRole = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this role?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${URL}/delete-role/${id}`);
        setRoles(roles.filter((role) => role._id !== id));
        setFilter(filter.filter((role) => role._id !== id));
      } catch (error) {
        console.error("Error deleting role:", error);
        alert("Failed to delete role");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    // Reset pagination to first page when search changes
    setPage(1);
  };

  useEffect(() => {
    // Filter roles based on search input
    const filteredRoles = roles.filter(role =>
      role.role.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(filteredRoles);
    setTotalPages(Math.ceil(filteredRoles.length / itemsPerPage));
  }, [search, roles]); // Re-filter roles when search or roles change

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <div className="main-admin">
        <div className="sidebar-section">
          <Sidebar />
        </div>
        <div className="admin-content-section">
          <div className="get-role-data">
            <div className="head-roles">
              <h1>ROLES</h1>
              <button
                className="btn1"
                onClick={() => navigate("/admin/roles/add")}
              >
                Add +
              </button>
              <div className="search-filter">
                <input
                  className="search"
                  placeholder="search here ..."
                  type="search"
                  name=""
                  id=""
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <table className="roles-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filter.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((role) => (
                  <tr key={role._id}>
                    <td>{role.role}</td>
                    <td>{role.description}</td>
                    <td>
                      <span onClick={() => handleEditRole(role._id)}>
                        <MdModeEditOutline />
                      </span>
                      <span onClick={() => handleDeleteRole(role._id)}>
                        <MdDelete />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            <tr >
              <td colSpan={3}>
            <div className="pagination-container">
              <Stack spacing={2}>
                <p>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
                </p>
              </Stack>
             
            </div>
            </td>
            </tr>
            </table>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Role;
