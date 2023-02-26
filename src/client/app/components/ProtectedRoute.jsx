import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.user);
  console.log(
    'In ProtectedRoute, user is: ',
    user,
    ' typeof user is: ',
    typeof user,
    ' user is null: ',
    user === 'null'
  );
  if (!user) {
    console.log('navigating to home');
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
