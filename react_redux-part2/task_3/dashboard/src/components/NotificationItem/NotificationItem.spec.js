import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('renders notification text in blue for default type', () => {
  render(
    <NotificationItem
      id={1}
      type="default"
      value="Default notification"
      markAsRead={() => {}}
    />
  );

  const item = screen.getByRole('listitem');
  expect(item).toBeInTheDocument();
  expect(item).toHaveTextContent('Default notification');
  expect(item.style.color).toBe('blue');
});

test('renders notification text in red for urgent type', () => {
  render(
    <NotificationItem
      id={2}
      type="urgent"
      value="Urgent notification"
      markAsRead={() => {}}
    />
  );

  const item = screen.getByRole('listitem');
  expect(item).toBeInTheDocument();
  expect(item).toHaveTextContent('Urgent notification');
  expect(item.style.color).toBe('red');
});
