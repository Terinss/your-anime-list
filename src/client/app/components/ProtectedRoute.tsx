import { Navigate, Outlet } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';
import { useAppDispatch } from '../hooks';
import { userSlice } from '../store/user';

const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const { login } = userSlice.actions;
  const dispatch = useAppDispatch();

  const verifyUser = async () => {
    const user = await fetch('/api/users/auth').then((res) => res.json());
    dispatch(login(user?.currentUser || null));
    setLoading(false);
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return loading ? (
    <h1>Loading...</h1>
  ) : !user ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
