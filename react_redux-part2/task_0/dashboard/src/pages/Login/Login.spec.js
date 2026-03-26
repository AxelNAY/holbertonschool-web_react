import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Login from './Login';
import rootReducer from '../../app/rootReducer';

const renderWithStore = (preloadedState = {}) => {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return {
    ...render(
      <Provider store={store}>
        <Login />
      </Provider>
    ),
    store,
  };
};

test('renders login form with email, password fields and submit button', () => {
  renderWithStore();

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
});

test('isLoggedIn is set to true after valid form submission', () => {
  const { store } = renderWithStore();

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /ok/i }));

  expect(store.getState().auth.isLoggedIn).toBe(true);
});

test('isLoggedIn remains false with invalid credentials', () => {
  const { store } = renderWithStore();

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });

  expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  expect(store.getState().auth.isLoggedIn).toBe(false);
});
