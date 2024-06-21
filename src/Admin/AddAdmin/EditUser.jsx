import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { URL } from '../../url/url';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditUser = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const result = await axios.get(`${URL}/get-user/${id}`);
      setData(result.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    role: Yup.string().required('Role is required'), // Added validation for role
  });

  const onSubmit = async (values) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(`${URL}/get-user/${id}`, values);
          Swal.fire({
            title: "Updated!",
            text: "User information has been updated.",
            icon: "success"
          });
          navigate('/admin');
          
          // Optionally, redirect to another page or show a success message
        } catch (error) {
          console.error('Error updating user:', error);
        }
      }
    });
  };

  return (
    <div className="main-admin">
      <div className="sidebar-section">
        <Sidebar />
      </div>
      <div className="admin-content-section">
        <h1>Edit Registered Users</h1>
        {data && (
          <Formik
            initialValues={{
              username: data.username,
              email: data.email,
              phoneNumber: data.phoneNumber,
              gender: data.gender,
              role: data.role, // Added role to initial values
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            <Form className="add-user-form-form-container">
              <div className="add-user-form-form-control">
                <label htmlFor="username">Username</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage name="username" component="div" className="add-user-form-error" />
              </div>
              <div className="add-user-form-form-control">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="add-user-form-error" />
              </div>
              <div className="add-user-form-form-control">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field type="text" id="phoneNumber" name="phoneNumber" />
                <ErrorMessage name="phoneNumber" component="div" className="add-user-form-error" />
              </div>
              <div className="add-user-form-form-control">
                <label>Gender</label>
                <div className="add-user-form-radio-group">
                  <label>
                    <Field type="radio" name="gender" value="male" />
                    Male
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="female" />
                    Female
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="other" />
                    Other
                  </label>
                </div>
                <ErrorMessage name="gender" component="div" className="add-user-form-error" />
              </div>
              <div className="add-user-form-form-control">
                <label htmlFor="role">Role</label>
                <Field as="select" id="role" name="role">
                  <option value="" label="Select role" />
                  <option value="user" label="User" />
                  <option value="admin" label="Admin" />
                  <option value="superadmin" label="Superadmin" />
                </Field>
                <ErrorMessage name="role" component="div" className="add-user-form-error" />
              </div>
              <button type="submit" className="add-user-form-submit-button">Submit</button>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

export default EditUser;
  