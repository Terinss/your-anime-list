import { render, screen } from '@testing-library/react';
import React from 'react';
import SignupForm from '../app/components/SignupForm';
import { MemoryRouter } from 'react-router-dom';

describe('SignupForm test', () => {
  // Arrange
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
  });

  test('SignupForm has a username field', () => {
    const usernameField = screen.queryByTestId('username');
    expect(usernameField).not.toBeNull();
  });

  test('SignupForm has a password field', () => {
    const passwordField = screen.queryByTestId('password');
    expect(passwordField).not.toBeNull();
  });

  test('SignupForm has a register button', () => {
    const registerButton = screen.queryByTestId('register');
    expect(registerButton).not.toBeNull();
  });
});
