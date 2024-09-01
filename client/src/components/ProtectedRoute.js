import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return isAuth ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;
