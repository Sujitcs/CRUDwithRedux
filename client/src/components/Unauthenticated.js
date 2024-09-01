import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Unauthenticated = ({ element }) => {
    const isAuth = useSelector((state) => state.auth.isAuth);

    return !isAuth ? element : <Navigate to="/" />;
};

export default Unauthenticated;
