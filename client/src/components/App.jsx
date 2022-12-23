import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Home from './Home';
import SeachPage from './SearchPage';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.css';

const AuthContext = React.createContext(null);
// const useAuth = React.useContext(AuthContext);

const App = () => {
  const [user, setUser] = useState('hi');

  return (
    <AuthContext.Provider value={user}>
      <Navigation logout={() => setUser(null)} />
      <div className="container my-5">
        <Routes>
          <Route path="/" element={<LoginForm setUser={setUser} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/home"
            element={
              <RequireAuth user={user}>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/search"
            element={
              <RequireAuth user={user}>
                <SeachPage />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
