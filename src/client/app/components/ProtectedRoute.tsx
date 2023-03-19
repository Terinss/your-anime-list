import { Navigate, Outlet } from 'react-router-dom';
import React, { useMemo } from 'react';
import { useAppSelector } from '../hooks';

const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.user);
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
