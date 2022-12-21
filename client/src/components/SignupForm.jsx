import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UNSAFE_NavigationContext } from 'react-router-dom';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.createUser = this.createUser.bind(this);
  }

  createUser(event) {
    try {
      event.preventDefault();
      const formData = this.state;
      fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Unable to create new user, invalid input');
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('!', error);
    }
  }

  render() {
    return (
      <Form className="container-lg" onSubmit={this.createUser}>
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
          Register Account
        </Button>
      </Form>
    );
  }
}

export default SignupForm;
