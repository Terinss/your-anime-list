import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../app/components/LoginForm';

describe('LoginForm test', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
  });

  test('LoginForm has a username field', () => {
    const usernameField = screen.queryByTestId('login-username');
    expect(usernameField).not.toBeNull();
  });

  test('LoginForm has a password field', () => {
    const passwordField = screen.queryByTestId('login-password');
    expect(passwordField).not.toBeNull();
  });

  test('LoginForm has a login button', () => {
    const loginButton = screen.queryByTestId('login-button');
    expect(loginButton).not.toBeNull();
  });

  test('LoginForm has a register button', () => {
    const registerButton = screen.queryByTestId('login-register-button');
    expect(registerButton).not.toBeNull();
  });
});
