import { render, screen } from '@testing-library/react'
import App from './App.jsx'

test('Verify if h1 contains School dashboard', () => {
  render(<App />)
  expect(
    screen.getByRole('heading', { level: 1, name: /school dashboard/i })
  ).toBeInTheDocument()
})

test('Verify if the content of the two paragraphs is correct', () => {
  render(<App />)
  expect(
    screen.getByText(/login to access the full dashboard/i)
  ).toBeInTheDocument()

  expect(
    screen.getByText(/copyright.*holberton.*school/i)
  ).toBeInTheDocument()
})

test('Verify if the image element is rendered', () => {
  render(<App />)
  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument()
})

test('Verify if the 2 input elements are rendered', () => {
  render(<App />)
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
})

test('Verify if the 2 label elements are rendered', () => {
  render(<App />)
  expect(screen.getByText(/email/i)).toBeInTheDocument()
  expect(screen.getByText(/password/i)).toBeInTheDocument()
})

test('Verify if the button element is rendered', () => {
  render(<App />)
  expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument()
})
