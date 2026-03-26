import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Footer from './Footer';
import rootReducer from '../../app/rootReducer';

const renderWithStore = (preloadedState = {}) => {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );
};

test('renders copyright text with current year and Holberton School', () => {
  renderWithStore({ auth: { isLoggedIn: false, user: { email: '', password: '' } } });

  const year = new Date().getFullYear();
  const copyrightEl = screen.getByText(new RegExp(`copyright ${year}`, 'i'));
  expect(copyrightEl).toBeInTheDocument();
  expect(copyrightEl).toHaveTextContent(/holberton school/i);
});

test('Contact us link is displayed when isLoggedIn is true', () => {
  renderWithStore({ auth: { isLoggedIn: true, user: { email: 'test@test.com', password: 'pass' } } });

  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
});

test('Contact us link is not displayed when isLoggedIn is false', () => {
  renderWithStore({ auth: { isLoggedIn: false, user: { email: '', password: '' } } });

  expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
});
