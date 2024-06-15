import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const AdminRoute = ({ element }: { element: JSX.Element }) => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser || !currentUser.roles.includes('ROLE_ADMIN')) {
    return <Navigate to="/home" />;
  }

  return element;
};

export default AdminRoute;
