import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AddRole.css';
import axios from 'axios';
import { URL } from '../../url/url';
import Sidebar from '../Sidebar';

const modules = [
  'Admin',
  'Link'
];

const AddRoles = () => {
  const initialValues = {
    role: '',
    description: '',
    permissions: modules.reduce((acc, moduleName) => {
      acc[moduleName] = {
        create: false,
        read: false,
        update: false,
        delete: false
      };
      return acc;
    }, {})
  };

  const validationSchema = Yup.object({
    role: Yup.string()
      .max(50, 'Role must be 50 characters or less')
      .required('Role is required'),
    description: Yup.string()
      .min(10, 'Description must be at least 10 characters')
      .max(200, 'Description must be 200 characters or less')
      .required('Description is required'),
    permissions: Yup.object().shape(
      modules.reduce((acc, moduleName) => {
        acc[moduleName] = Yup.object({
          create: Yup.boolean(),
          read: Yup.boolean(),
          update: Yup.boolean(),
          delete: Yup.boolean()
        });
        return acc;
      }, {})
    )
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Combine all permissions into a single array
      const permissionsArray = Object.keys(values.permissions).map(moduleName => ({
        moduleName,
        ...values.permissions[moduleName]
      }));

      // Make POST request to your backend API
      const response = await axios.post(`${URL}/create-role`, {
        role: values.role,
        description: values.description,
        permissions: permissionsArray
      });

      console.log('Form data', values);
      console.log('API response', response.data);

      alert('Role created successfully!');
      resetForm();
    } catch (error) {
      console.error('Error creating role:', error);
      alert('Failed to create role');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="main-admin">
      <div className="sidebar-section">
        <Sidebar />
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
                  <label htmlFor="role">Role</label>
                  <Field type="text" id="role" name="role" />
                  <ErrorMessage name="role" component="div" className="error-message" />
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
                  {modules.map(moduleName => (
                    <div className="table-row" key={moduleName}>
                      <div className="row-item">{moduleName}</div>
                      <div className="row-item">
                        <Field type="checkbox" name={`permissions.${moduleName}.create`} />
                      </div>
                      <div className="row-item">
                        <Field type="checkbox" name={`permissions.${moduleName}.read`} />
                      </div>
                      <div className="row-item">
                        <Field type="checkbox" name={`permissions.${moduleName}.update`} />
                      </div>
                      <div className="row-item">
                        <Field type="checkbox" name={`permissions.${moduleName}.delete`} />
                      </div>
                    </div>
                  ))}
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
  );
};

export default AddRoles;
