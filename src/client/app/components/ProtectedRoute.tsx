import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';
import { useAppDispatch } from '../hooks';
import { userSlice } from '../store/user';
import api from './api/api_instance';
import Loader from './Loader';

const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const { login } = userSlice.actions;
  const dispatch = useAppDispatch();

  const verifyUser = async () => {
    try {
      const response = await api.get('/api/users/auth');
      const user = response.data;
      dispatch(login(user?.currentUser || null));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return loading ? (
    <Loader />
  ) : user === null ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
