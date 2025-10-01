import { render, screen } from '@testing-library/react'
import Footer from './Footer.jsx'

test('Verify if the content of the paragraph is correct', () => {
  render(<Footer />)
  expect(
    screen.getByText(/copyright.*holberton.*school/i)
  ).toBeInTheDocument()
})
