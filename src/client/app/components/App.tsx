import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignupForm from '../Pages/SignupForm';
import LoginForm from '../Pages/LoginForm';
import Home from '../Pages/Home';
import SeachPage from '../Pages/SearchPage';
import Navigation from './Navigation';
import ProtectedRoute from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.css';

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SeachPage />} />
        </Route>
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
