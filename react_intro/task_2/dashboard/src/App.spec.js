import { render, screen } from '@testing-library/react'
import App from './App.jsx'

test('Verify if h1 contain School dashboard', () => {
  render(<App />)
  const h1Element = screen.getByRole('heading', { 
    level: 1, 
    name: /school dashboard/i 
  });
  expect(h1Element).toBeInTheDocument();
})

test('Verify if the content of the two paragraph', () => {
  render(<App />)
  const BodyParaph = screen.getByText('Login to access the full dashboard');
  expect(BodyParaph).toBeInTheDocument();

  const FooterParaph = screen.getByText(/copyright.*holberton.*school/i);
  expect(FooterParaph).toBeInTheDocument();
})

test('Verify if the image element is rendered', () => {
  render(<App />)
  const Image = screen.getByAltText(/holberton logo/i);
  expect(Image).toBeInTheDocument();
})

test('Verify if the 2 input elements are rendered', () => {
  render(<App />)
  const emailInput = screen.getByPlaceholderText(/email/i);
  expect(emailInput).toBeInTheDocument();
  expect(emailInput.tagName.toLowerCase()).toBe('input');

  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput.tagName.toLowerCase()).toBe('input');
})

test('Verify if the 2 label elements are rendered', () => {
  render(<App />)
  const emailLabel = screen.getByText(/email/i);
  expect(emailLabel).toBeInTheDocument();
  expect(emailLabel.tagName.toLowerCase()).toBe('label');

  const passwordLabel = screen.getByText(/password/i);
  expect(passwordLabel).toBeInTheDocument();
  expect(passwordLabel.tagName.toLowerCase()).toBe('label');
})

test('Verify if the 2 label elements are rendered', () => {
  render(<App />)
  const okButton = screen.getByRole('button', { name: /ok/i });
  expect(okButton).toBeInTheDocument();
})

