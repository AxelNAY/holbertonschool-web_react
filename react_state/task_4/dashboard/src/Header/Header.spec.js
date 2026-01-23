import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import AppContext from '../Context/context';

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

const loggedInUser = {
  email: 'test@example.com',
  password: 'password123',
  isLoggedIn: true,
};

describe('Header', () => {
  test('renders the title', () => {
    render(
      <AppContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
        <Header />
      </AppContext.Provider>
    );
    expect(screen.getByRole('heading', { name: /school dashboard/i })).toBeInTheDocument();
  });

  test('renders the Holberton logo with alt text', () => {
    render(
      <AppContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
        <Header />
      </AppContext.Provider>
    );
    const img = screen.getByAltText(/holberton logo/i);
    expect(img).toBeInTheDocument();
    expect(img.closest('.App-header')).toBeInTheDocument();
  });

  test('does not render logoutSection when user is not logged in', () => {
    render(
      <AppContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
        <Header />
      </AppContext.Provider>
    );
    const logoutSection = document.getElementById('logoutSection');
    expect(logoutSection).toBeNull();
    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
  });

  test('renders logoutSection when user is logged in', () => {
    render(
      <AppContext.Provider value={{ user: loggedInUser, logOut: jest.fn() }}>
        <Header />
      </AppContext.Provider>
    );
    const logoutSection = document.getElementById('logoutSection');
    expect(logoutSection).toBeInTheDocument();
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  test('calls logOut when clicking logout link', () => {
    const mockLogOut = jest.fn();
    render(
      <AppContext.Provider value={{ user: loggedInUser, logOut: mockLogOut }}>
        <Header />
      </AppContext.Provider>
    );
    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
});
