import { render, screen } from '@testing-library/react'
import Login from './Login.jsx'

test('Verify if the content of the paragraph is correct', () => {
  render(<Login />)
  expect(
    screen.getByText(/login to access the full dashboard/i)
  ).toBeInTheDocument()
})

test('renders two input elements (email and password)', () => {
  const { container } = render(<App />);

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(container.querySelectorAll('input')).toHaveLength(2);
});

test('Verify if the 2 label elements are rendered', () => {
  render(<App />)
  expect(screen.getByText(/email/i)).toBeInTheDocument()
  expect(screen.getByText(/password/i)).toBeInTheDocument()
})

test('Verify if the button element is rendered', () => {
  render(<App />)
  expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument()
})
