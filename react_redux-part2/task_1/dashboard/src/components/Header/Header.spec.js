import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Header from './Header';
import rootReducer from '../../app/rootReducer';
import { login } from '../../features/auth/authSlice';

const createStore = (preloadedState = {}) =>
  configureStore({ reducer: rootReducer, preloadedState });

const renderWithStore = (store) =>
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

test('logout link is displayed when isLoggedIn is true', () => {
  const store = createStore({
    auth: { isLoggedIn: true, user: { email: 'test@test.com', password: 'pass' } }
  });
  renderWithStore(store);

  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});

test('welcome message shows email after login action is dispatched', () => {
  const store = createStore();
  store.dispatch(login({ email: 'user@example.com', password: 'password123' }));
  renderWithStore(store);

  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  expect(screen.getByText('user@example.com')).toBeInTheDocument();
});

test('isLoggedIn is set to false after logout action', () => {
  const store = createStore({
    auth: { isLoggedIn: true, user: { email: 'test@test.com', password: 'pass' } }
  });
  renderWithStore(store);

  fireEvent.click(screen.getByText(/logout/i));

  expect(store.getState().auth.isLoggedIn).toBe(false);
});
