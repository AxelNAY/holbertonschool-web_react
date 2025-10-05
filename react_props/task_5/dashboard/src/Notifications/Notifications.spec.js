import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import Notifications from './Notifications.jsx';

const sample = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong>' } },
];

describe('Notifications component (Task 5)', () => {
  test('always shows the "Your notifications" title', () => {
    render(<Notifications />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('with displayDrawer=false: no list, no "Here is...", no button', () => {
    render(<Notifications displayDrawer={false} notifications={sample} />);
    expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();
    expect(screen.queryByRole('list')).toBeNull();
    expect(screen.queryByRole('button', { name: /close/i })).toBeNull();
  });

  test('with displayDrawer=true and notifications non-empty: shows list, text and button', () => {
    const { container } = render(<Notifications displayDrawer notifications={sample} />);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();

    const list = container.querySelector('ul');
    expect(list).toBeTruthy();
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(sample.length);

    const closeBtn = screen.getByRole('button', { name: /close/i });
    expect(closeBtn).toBeInTheDocument();

    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    fireEvent.click(closeBtn);
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/close button has been clicked/i));
    spy.mockRestore();
  });

  test('with displayDrawer=true and notifications empty: shows "No new notification for now" and no button', () => {
    render(<Notifications displayDrawer notifications={[]} />);
    expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close/i })).toBeNull();
  });
});
