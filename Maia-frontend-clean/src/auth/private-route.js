import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth-context';

const PrivateRoute = ({ children }) => {
  const { authTokens } = useAuth();
  const location = useLocation();

  const isAuthenticated = !!authTokens?.access;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
