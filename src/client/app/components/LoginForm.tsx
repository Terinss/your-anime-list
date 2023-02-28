import React, { useState, useEffect, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { userSlice } from '../store/user';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/loginform.css';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);

  const { login } = userSlice.actions;

  useEffect(() => {
    fetch('/api/users/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(({ success, currentUser }) => {
        console.log('got data back when logging in: ', success, currentUser);
        if (success) {
          console.log('dispatching login');
          dispatch(login(currentUser));
          navigate('/home');
        }
      });
  }, []);

  const loginUser = (event: FormEvent) => {
    event.preventDefault();
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(({ success, currentUser }) => {
        console.log('got data back when logging in: ', success, currentUser);
        if (success) {
          dispatch(login(currentUser));
          navigate('/home');
        }
      })
      .catch((err) => console.error(err));
  };

  return user ? (
    <Navigate to="/home" />
  ) : (
    <Form className="container-lg login-form" onSubmit={loginUser}>
      <h1>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          onChange={(e) =>
            setFormData({
              username: e.target.value,
              password: formData.password,
            })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          onChange={(e) =>
            setFormData({
              username: formData.username,
              password: e.target.value,
            })
          }
        />
      </Form.Group>
      <div className="button-container">
        <Button variant="success" type="submit">
          Login
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            console.log('clicked');
            navigate('/signup');
          }}
        >
          Register an Account
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
