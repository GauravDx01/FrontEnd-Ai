import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AddRole.css';
import RoleSelect from './RoleSelect';
import axios from 'axios';
import {URL} from '../../url/url'
import Sidebar from '../Sidebar';
const AddRoles = () => {
  const initialValues = {
    role: '',
    description: '',
    permissions: {
      moduleName: '', // This field isn't used in the schema or form
      create: false,
      read: false,
      update: false,
      delete: false
    }
  };

  const validationSchema = Yup.object({
    role: Yup.string()
      .max(50, 'Role must be 50 characters or less')
      .required('Role is required'),
    description: Yup.string()
      .min(10, 'Description must be at least 10 characters')
      .max(200, 'Description must be 200 characters or less')
      .required('Description is required'),
    permissions: Yup.object({
      create: Yup.boolean(),
      read: Yup.boolean(),
      update: Yup.boolean(),
      delete: Yup.boolean()
    })
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Make POST request to your backend API
      const response = await axios.post(`${URL}/create-role`, values);

      console.log('Form data', values);
      console.log('API response', response.data);

      // Optionally handle success (e.g., show success message, redirect, etc.)
      alert('Role created successfully!');
      resetForm();
    } catch (error) {
      console.error('Error creating role:', error);
      // Handle error (e.g., show error message)
      alert('Failed to create role');
    } finally {
      setSubmitting(false); // Reset submitting state regardless of success/error
    }
  };

  return (
    <>
    <div className="main-admin">
      <div className="sidebar-section">
        <Sidebar/>
      </div>
      <div className="admin-content-section">
      <div className="role-form">

<h1>Roles Section</h1>
<Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={onSubmit}
>
  {formik => (
    <Form>
      <div className="form-group">
        <RoleSelect />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <Field as="textarea" id="description" name="description" />
        <ErrorMessage name="description" component="div" className="error-message" />
      </div>
      <h2>Module Permissions</h2>
      <div className="permissions-table">
        <div className="table-header">
          <div className="header-item">Module Name</div>
          <div className="header-item">Create</div>
          <div className="header-item">Read</div>
          <div className="header-item">Update</div>
          <div className="header-item">Delete</div>
        </div>
        <div className="table-row">
          <div className="row-item">
            LINKS {/* Adjust as needed */}
          </div>
          <div className="row-item">
            <Field type="checkbox" name="permissions.create" />
          </div>
          <div className="row-item">
            <Field type="checkbox" name="permissions.read" />
          </div>
          <div className="row-item">
            <Field type="checkbox" name="permissions.update" />
          </div>
          <div className="row-item">
            <Field type="checkbox" name="permissions.delete" />
          </div>
        </div>
      </div>
      <button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </Form>
  )}
</Formik>
</div>
      </div>
    </div>
  
    </>
  );
};

export default AddRoles;
