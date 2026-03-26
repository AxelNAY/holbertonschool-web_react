import { render, screen, waitFor, act } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from '../App';
import mockAxios from 'jest-mock-axios';
import rootReducer from '../app/rootReducer';

afterEach(() => {
  mockAxios.reset();
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

const mockCoursesResponse = {
  data: {
    courses: [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ]
  }
};

const renderWithStore = (preloadedState = {}) => {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return {
    ...render(
      <Provider store={store}>
        <App />
      </Provider>
    ),
    store,
  };
};

test('renders Login when isLoggedIn is false', async () => {
  renderWithStore({
    auth: { isLoggedIn: false, user: { email: '', password: '' } }
  });

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

  await act(async () => {
    mockAxios.mockResponse(mockNotificationsResponse);
  });
});

test('renders CourseList when isLoggedIn is true', async () => {
  renderWithStore({
    auth: { isLoggedIn: true, user: { email: 'test@test.com', password: 'password123' } }
  });

  expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument();

  await act(async () => {
    mockAxios.mockResponse(mockNotificationsResponse);
    mockAxios.mockResponse(mockCoursesResponse);
  });
});

test('notification items are displayed on mount', async () => {
  renderWithStore();

  expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });
});
