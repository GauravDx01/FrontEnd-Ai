import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Sidebar from '../Sidebar';
import './style.css'; // Import your CSS file
import axios from 'axios'
import { URL } from '../../url/url';

const AddUser = () => {
  const initialValues = {
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    gender: '',
    role: '', // Added role to initial values
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    gender: Yup.string().required('Gender is required'),
    role: Yup.string().required('Role is required'), // Added validation for role
  });

  const onSubmit = async (values) => {
    console.log('Form data', values);
    // Handle form submission
    const sendData = await axios.post(`${URL}/register`, values)
    console.log("sendData", sendData)
  };

  return (
    <>
      <div className="main-admin">
        <div className="sidebar-section">
          <Sidebar />
        </div>
        <div className="admin-content-section">
          <div className="add-user-head">
            <h1>Register Users</h1>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
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
                  <label htmlFor="password">Password</label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage name="password" component="div" className="add-user-form-error" />
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
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddUser;
