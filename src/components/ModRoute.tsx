import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const ModRoute = ({ element }: { element: JSX.Element }) => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser || !currentUser.roles.includes('ROLE_MODERATOR')) {
    return <Navigate to="/home" />;
  }

  return element;
};

export default ModRoute;
