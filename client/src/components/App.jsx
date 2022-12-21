import React, { Component } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import TrendingShowsDisplay from './TrendingShowsDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/trending" element={<TrendingShowsDisplay />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    );
  }
}

export default App;
