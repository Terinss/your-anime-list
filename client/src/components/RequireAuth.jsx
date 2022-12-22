import { Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import { useAuth } from './Auth';

export const RequireAuth = ({ children, user }) => {
  console.log('in require auth', user);
  //   fetch('/api/users/isloggedin')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       login(data.isLoggedIn);
  //     });

  if (!user) return <Navigate to="/" />;
  else return children;
};
