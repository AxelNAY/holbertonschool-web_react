import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationItem from './NotificationItem';

describe('NotificationItem component (Task 2)', () => {
  test('default → data-notification-type="default" et couleur bleu', () => {
    render(
      <ul>
        <NotificationItem type="default" value="Default note" />
      </ul>
    );
    const li = screen.getByRole('listitem');
    expect(li).toHaveAttribute('data-notification-type', 'default');
    expect(li).toHaveStyle({ color: 'rgb(0, 0, 255)' }); // Format RGB
    expect(li).toHaveTextContent('Default note');
  });

  test('urgent → data-notification-type="urgent" et couleur rouge', () => {
    render(
      <ul>
        <NotificationItem type="urgent" value="Urgent note" />
      </ul>
    );
    const li = screen.getByRole('listitem');
    expect(li).toHaveAttribute('data-notification-type', 'urgent');
    expect(li).toHaveStyle({ color: 'rgb(255, 0, 0)' }); // Format RGB
    expect(li).toHaveTextContent('Urgent note');
  });
});
