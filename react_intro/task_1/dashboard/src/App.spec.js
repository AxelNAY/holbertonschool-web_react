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

  const FooterParaph = screen.getByText('Copyright 2025 - holberton School');
  expect(FooterParaph).toBeInTheDocument();
})

test('Verify if the image element is rendered', () => {
  render(<App />)
  const Image = screen.getByAltText(/holberton logo/i);
  expect(Image).toBeInTheDocument();
})
