import React, { useState, useEffect, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { userSlice } from '../store/user';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../components/api/api_instance';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/loginform.css';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);

  const { login } = userSlice.actions;

  useEffect(() => {
    api
      .get('/api/users/auth')
      .then((res) => res.data)
      .then(({ success, currentUser }) => {
        if (success) {
          dispatch(login(currentUser));
          navigate('/home');
        }
      });
  }, []);

  const loginUser = (event: FormEvent) => {
    event.preventDefault();
    api
      .post('/api/users/login', JSON.stringify(formData))
      .then((res) => res.data)
      .then(({ success, currentUser }) => {
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
          data-testid="login-username"
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
          data-testid="login-password"
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
        <Button data-testid="login-button" variant="success" type="submit">
          Login
        </Button>
        <Button
          data-testid="login-register-button"
          variant="primary"
          onClick={() => {
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
