import mockAxios from 'jest-mock-axios';
import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from './notificationsSlice';

afterEach(() => {
  mockAxios.reset();
});

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    displayDrawer: true,
  };

  it('should return the correct initial state by default', () => {
    expect(notificationsReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should fetch notifications correctly', async () => {
    const store = configureStore({ reducer: notificationsReducer });

    const mockData = {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: '<strong>Urgent requirement</strong> - complete by EOD' },
      ],
    };

    const thunkPromise = store.dispatch(fetchNotifications());
    mockAxios.mockResponse({ data: mockData });
    await thunkPromise;

    const state = store.getState();
    expect(state.notifications).toHaveLength(3);
    expect(state.notifications[2].html).toBe('<strong>Urgent requirement</strong> - complete by EOD');
  });

  it('should remove a notification when markNotificationAsRead is dispatched', () => {
    const stateWithNotifications = {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ],
      displayDrawer: true,
    };
    const state = notificationsReducer(stateWithNotifications, markNotificationAsRead(1));
    expect(state.notifications).toHaveLength(1);
    expect(state.notifications[0].id).toBe(2);
  });

  it('should set displayDrawer to true when showDrawer is dispatched', () => {
    const state = notificationsReducer({ ...initialState, displayDrawer: false }, showDrawer());
    expect(state.displayDrawer).toBe(true);
  });

  it('should set displayDrawer to false when hideDrawer is dispatched', () => {
    const state = notificationsReducer(initialState, hideDrawer());
    expect(state.displayDrawer).toBe(false);
  });
});
