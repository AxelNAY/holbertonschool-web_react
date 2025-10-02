import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  test('default type -> blue + data-notification-type="default"', () => {
    render(<NotificationItem type="default" value="Default text" />);
    const li = screen.getByText('Default text');
    expect(li).toBeInTheDocument();
    expect(li).toHaveAttribute('data-notification-type', 'default');
    expect(li).toHaveStyle('color: blue');
  });

  test('urgent type -> red + data-notification-type="urgent"', () => {
    render(<NotificationItem type="urgent" value="Urgent text" />);
    const li = screen.getByText('Urgent text');
    expect(li).toBeInTheDocument();
    expect(li).toHaveAttribute('data-notification-type', 'urgent');
    expect(li).toHaveStyle('color: red');
  });
});
