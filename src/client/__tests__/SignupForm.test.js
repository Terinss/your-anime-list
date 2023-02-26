import { render } from '@testing-library/react';
import SignupForm from '../app/components/SignupForm';
import jest from 'jest';
import { MemoryRouter } from 'react-router-dom';

test('SignupForm renders correctly', () => {
  const { container } = render(
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
});
