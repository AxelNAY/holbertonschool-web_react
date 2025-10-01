import { render, screen } from '@testing-library/react'
import Login from './Login.jsx'

test('Verify if the content of the paragraph is correct', () => {
  render(<Login />)
  expect(
    screen.getByText(/login to access the full dashboard/i)
  ).toBeInTheDocument()
})

test('Verify if the 2 input elements are rendered', () => {
  render(<Login />)
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
})

test('Verify if the 2 label elements are rendered', () => {
  render(<Login />)
  expect(screen.getByText(/email/i)).toBeInTheDocument()
  expect(screen.getByText(/password/i)).toBeInTheDocument()
})

test('Verify if the button element is rendered', () => {
  render(<Login />)
  expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument()
})
