import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../Components/services/authService';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!authService.getCurrentUser();

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
