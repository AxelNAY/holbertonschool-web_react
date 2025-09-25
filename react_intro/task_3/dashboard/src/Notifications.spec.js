import { render, screen, fireEvent } from '@testing-library/react'
import Notifications from './Notifications.jsx'

test('Verify the existence of the notifications title Here is the list of notifications', () => {
  render(<Notifications />)
  expect(
    screen.getByText(/Here is the list of notifications/i)
  ).toBeInTheDocument()
})

test('Verify the existence of the button element in the notifications', () => {
  render(<Notifications />)
  expect(screen.getByRole('button')).toBeInTheDocument()
})

test('Verify there are 3 li elements as notifications rendered', () => {
  render(<Notifications />)
  const listItems = screen.getAllByRole('listitem')
  expect(listItems).toHaveLength(3)
})

test('Verify whether clicking the close button logs Close button has been clicked to the console', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  render(<Notifications />)
  const closeButton = screen.getByRole('button')
  fireEvent.click(closeButton)

  expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked')
  consoleSpy.mockRestore()
})
