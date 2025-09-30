import { render, screen } from '@testing-library/react'
import App from './App'

test('Verify if all components are rendered', () => {
  render(<App />)
  expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 1, name: /school dashboard/i })).toBeInTheDocument()
  expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument()
  expect(screen.getByText(/copyright.*holberton.*school/i)).toBeInTheDocument()
})
