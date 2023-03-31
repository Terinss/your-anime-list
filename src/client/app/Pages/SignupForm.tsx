import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import api from '../components/api/api_instance';
import '../styles/signupform.css';

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const createUser = (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      api
        .post('/api/users/signup', {
          body: JSON.stringify(formData),
        })
        .then(({ data }) => {
          if (!data.ok) {
            throw new Error('Unable to create new user, invalid input');
          } else navigate('/');
        })
        .catch((err) => err);
    } catch (error) {
      console.error('!', error);
    }
  };

  return (
    <Form className="container-lg signup-form" onSubmit={createUser}>
      <h1>Sign Up</h1>
      <Form.Group className="mb-3" controlId="formBasicusername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          data-testid="username"
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
          data-testid="password"
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
        <Button variant="primary" type="submit" data-testid="register">
          Register Account
        </Button>
        <Button
          variant="secondary"
          type="button"
          data-testid="back-to-login"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </Button>
      </div>
    </Form>
  );
};

export default SignupForm;
