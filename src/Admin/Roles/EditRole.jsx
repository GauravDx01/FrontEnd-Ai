import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../url/url'; // Adjust path as needed
import Sidebar from '../Sidebar';

const modules = ['Admin', 'Link'];

const EditRole = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    role: '',
    description: '',
    permissions: modules.map(moduleName => ({
      moduleName,
      permissions: {
        create: false,
        read: false,
        update: false,
        delete: false
      }
    }))
  });

  const validationSchema = Yup.object({
    role: Yup.string()
      .max(50, 'Role must be 50 characters or less')
      .required('Role is required'),
    description: Yup.string()
      .min(10, 'Description must be at least 10 characters')
      .max(200, 'Description must be 200 characters or less')
      .required('Description is required'),
    permissions: Yup.array().of(
      Yup.object({
        moduleName: Yup.string().required(),
        permissions: Yup.object({
          create: Yup.boolean(),
          read: Yup.boolean(),
          update: Yup.boolean(),
          delete: Yup.boolean()
        })
      })
    )
  });

  useEffect(() => {
    const getRoleData = async () => {
      try {
        const response = await axios.get(`${URL}/edit-role/${id}`);
        console.log('API Response:', response.data);

        const { role, description, permissions } = response.data.data;
        const formattedPermissions = permissions.map(permission => ({
          moduleName: permission.moduleName,
          permissions: permission.permissions
        }));

        setInitialValues({ role, description, permissions: formattedPermissions });
      } catch (error) {
        console.error('Error fetching role data:', error);
        alert('Failed to fetch role data. Please try again.');
      }
    };

    getRoleData();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Prepare payload to update role
      const payload = {
        role: values.role,
        description: values.description,
        permissions: values.permissions.map(permission => ({
          moduleName: permission.moduleName,
          permissions: permission.permissions
        }))
      };

      // Make PUT request to update role
      await axios.put(`${URL}/edit-role/${id}`, payload);
      alert('Role updated successfully');
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
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
                  {modules.map((moduleName, index) => (
                    <div className="table-row" key={moduleName}>
                      <div className="row-item">{moduleName}</div>
                      <div className="row-item">
                        <Field type="checkbox" name={`permissions[${index}].permissions.create`} />
                      </div>
                      <div className="row-item">
                        <Field type="checkbox" name={`permissions[${index}].permissions.read`} />
                      </div>
                      <div className="row-item">
                        <Field type="checkbox" name={`permissions[${index}].permissions.update`} />
                      </div>
                      <div className="row-item">
                        <Field type="checkbox" name={`permissions[${index}].permissions.delete`} />
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

export default EditRole;
