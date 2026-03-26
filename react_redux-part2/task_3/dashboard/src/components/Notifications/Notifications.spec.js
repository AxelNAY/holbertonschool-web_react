import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Notifications from './Notifications';
import mockAxios from 'jest-mock-axios';
import rootReducer from '../../app/rootReducer';
import { fetchNotifications } from '../../features/notifications/notificationsSlice';

afterEach(() => {
  mockAxios.reset();
});

const visibleStyles = StyleSheet.create({
  visible: {
    opacity: 1,
    visibility: "visible",
  }
});

const mockNotificationsResponse = {
  data: [
    {
      id: '1',
      context: { isRead: false, type: 'default', value: 'New course available' }
    },
    {
      id: '2',
      context: { isRead: false, type: 'urgent', value: 'New resume available' }
    },
    {
      id: '3',
      context: { isRead: true, type: 'urgent', value: 'Already read notification' }
    }
  ]
};

const createStore = (preloadedState = {}) =>
  configureStore({ reducer: rootReducer, preloadedState });

test('notification items are displayed after fetchNotifications API call', async () => {
  const store = createStore();
  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  store.dispatch(fetchNotifications());
  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });
});

test('closing the drawer removes the visible class', () => {
  const store = createStore({
    notifications: {
      notifications: [{ id: 1, type: 'default', value: 'Test notification' }],
    }
  });
  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  const drawer = screen.getByTestId('notifications-drawer');
  const visibleClass = css(visibleStyles.visible);

  fireEvent.click(screen.getByText(/your notifications/i));
  expect(drawer.classList.contains(visibleClass)).toBe(true);

  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(drawer.classList.contains(visibleClass)).toBe(false);
});

test('clicking "Your notifications" adds the visible class to the drawer', () => {
  const store = createStore({
    notifications: {
      notifications: [],
    }
  });
  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  const drawer = screen.getByTestId('notifications-drawer');
  const visibleClass = css(visibleStyles.visible);

  expect(drawer.classList.contains(visibleClass)).toBe(false);

  fireEvent.click(screen.getByText(/your notifications/i));

  expect(drawer.classList.contains(visibleClass)).toBe(true);
});

test('displays loading indicator when loading is true', () => {
  const store = createStore({
    notifications: {
      notifications: [],
      loading: true,
    }
  });
  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(screen.queryByText('No new notifications for now')).not.toBeInTheDocument();
});

test('does not display loading indicator when loading is false', () => {
  const store = createStore({
    notifications: {
      notifications: [],
      loading: false,
    }
  });
  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  expect(screen.getByText('No new notifications for now')).toBeInTheDocument();
});

test('marking a notification as read removes it from the list', () => {
  const store = createStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'First notification' },
        { id: 2, type: 'urgent', value: 'Second notification' }
      ],
    }
  });
  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(2);

  fireEvent.click(listItems[0]);

  expect(store.getState().notifications.notifications).toHaveLength(1);
  expect(store.getState().notifications.notifications[0].id).toBe(2);
});

test('clicking urgent filter button shows only urgent notifications', () => {
  const store = createStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'Default notification' },
        { id: 2, type: 'urgent', value: 'Urgent notification' },
      ],
    }
  });
  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(screen.getByRole('button', { name: /filter urgent/i }));

  expect(screen.getByText('Urgent notification')).toBeInTheDocument();
  expect(screen.queryByText('Default notification')).not.toBeInTheDocument();
});

test('clicking default filter button shows only default notifications', () => {
  const store = createStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'Default notification' },
        { id: 2, type: 'urgent', value: 'Urgent notification' },
      ],
    }
  });
  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(screen.getByRole('button', { name: /filter default/i }));

  expect(screen.getByText('Default notification')).toBeInTheDocument();
  expect(screen.queryByText('Urgent notification')).not.toBeInTheDocument();
});
