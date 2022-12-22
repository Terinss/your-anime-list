import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from './Auth';

const LoginForm = (props) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  // const auth = useAuth();

  const loginUser = (event) => {
    event.preventDefault();
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          props.setUser(formData.username);
          navigate('/home');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Form className="container-lg" onSubmit={loginUser}>
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
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Button variant="secondary" onClick={() => navigate('/signup')}>
        Register an Account
      </Button>
    </>
  );
};

export default LoginForm;
