import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const UserRoute = ({ element }: { element: JSX.Element }) => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser || !currentUser.roles.includes('ROLE_USER')) {
    return <Navigate to="/home" />;
  }

  return element;
};

export default UserRoute;
