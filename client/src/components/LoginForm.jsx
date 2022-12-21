import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(event) {
    event.preventDefault();
    const formData = this.state;
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) navigate('/trending');
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <Form className="container-lg" onSubmit={this.loginUser}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) =>
              this.setState({
                username: e.target.value,
                password: this.state.password,
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
              this.setState({
                username: this.state.username,
                password: e.target.value,
              })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
