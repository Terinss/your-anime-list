import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../styles/signupform.css';

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const createUser = (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Unable to create new user, invalid input');
          } else navigate('/');
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('!', error);
    }
  };

  return (
    <Form className="container-lg signup-form" onSubmit={createUser}>
      <h1>Sign Up</h1>
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
        Register Account
      </Button>
    </Form>
  );
};

export default SignupForm;
