import { render, screen } from '@testing-library/react'
import App from './App.jsx'

test('Verify if h1 contains School dashboard', () => {
  render(<App />)
  const h1Element = screen.getByRole('heading', { 
    level: 1, 
    name: /school dashboard/i 
  });
  expect(h1Element).toBeInTheDocument();
})

test('Verify if the content of the two paragraphs is correct', () => {
  render(<App />)
  const bodyParagraph = screen.getByText(/login to access the full dashboard/i);
  expect(bodyParagraph).toBeInTheDocument();

  const footerParagraph = screen.getByText(/copyright.*holberton.*school/i);
  expect(footerParagraph).toBeInTheDocument();
})

test('Verify if the image element is rendered', () => {
  render(<App />)
  const imgElement = screen.getByAltText(/holberton logo/i);
  expect(imgElement).toBeInTheDocument();
})

test('Verify if the 2 input elements are rendered', () => {
  render(<App />)
  const emailInput = screen.getByPlaceholderText(/email/i);
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput).toBeInTheDocument();
})

test('Verify if the 2 label elements are rendered', () => {
  render(<App />)
  const emailLabel = screen.getByText(/email/i);
  expect(emailLabel).toBeInTheDocument();

  const passwordLabel = screen.getByText(/password/i);
  expect(passwordLabel).toBeInTheDocument();
})

test('Verify if the button element is rendered', () => {
  render(<App />)
  const okButton = screen.getByRole('button', { name: /ok/i });
  expect(okButton).toBeInTheDocument();
})
