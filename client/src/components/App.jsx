import React, { Component } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Home from './Home';
import SeachPage from './SearchPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import '../styles/app.css';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SeachPage />} />
      </Routes>
    );
  }
}

export default App;
