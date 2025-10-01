import { render, screen } from '@testing-library/react'
import Header from './Header.jsx'

test('Verify if h1 contains School dashboard', () => {
  render(<Header />)
  expect(
    screen.getByRole('heading', { level: 1, name: /school dashboard/i })
  ).toBeInTheDocument()
})

test('Verify if the image element is rendered', () => {
  render(<Header />)
  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument()
})
