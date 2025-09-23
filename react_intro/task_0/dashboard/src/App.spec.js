import { render, screen } from '@testing-library/react'
import App from './App.jsx'

test('Verify if h1 contain School dashboard', () => {
  const h1Element = screen.getByRole('heading', { 
    level: 1, 
    name: /school dashboard/i 
  });
  expect(h1Element).toBeInTheDocument();
})

test('Verify if the content of the two paragraph', () => {
  const BodyParaph = screen.getByText('Login to access the full dashboard');
  expect(BodyParaph).toBeInTheDocument();
  expect(BodyParaph.tagName.toLowerCase()).toBe('p');

  const FooterParaph = screen.getByText('Copyright 2025 - holberton School');
  expect(FooterParaph).toBeInTheDocument();
  expect(BodyParaph.tagName.toLowerCase()).toBe('p');
})

test('Verify if the image element is rendered', () => {
  const Image = screen.getByAltText('holberton logo');
  expect(Image).toBeInTheDocument();
})
