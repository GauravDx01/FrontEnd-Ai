import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import RoleSelect from './RoleSelect';
import { URL } from '../../url/url';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
    
function EditRole() {
  


  const [initialValues, setInitialValues] = useState({
    role: '',
    description: '',
    permissions: {
      create: false,
      read: false,
      update: false,
      delete: false
    }
  });

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

  const params = useParams();
  const id = params.id;

  const getRolesData = async () => {
    try {
      const result = await axios.get(`${URL}/edit-role/${id}`);
      const { role, description, permissions } = result.data.data;
      setInitialValues({ role, description, permissions });
    } catch (error) {
      console.error('Error fetching role data:', error);
    }
  };

  useEffect(() => {
    getRolesData();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put(`${URL}/edit-role/${id}`, values);
      alert('Role updated successfully');
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>

        <div className="main-admin">
            <div className="sidebar-section">
                <Sidebar/>
            </div>

            <div className="admin-content-section">
            <div className="role-form">
        <h1>Edit Role</h1>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
                  <div className="row-item">LINKS {/* Adjust as needed */}</div>
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
    
    </div>
  );
}

export default EditRole;
    