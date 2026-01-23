import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';
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

describe('Footer', () => {
  test('renders copyright with current year', () => {
    render(
      <AppContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
        <Footer />
      </AppContext.Provider>
    );
    const year = new Date().getFullYear().toString();

    const p = screen.getByText(/copyright/i);
    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent(year);
  });

  test('does not display "Contact us" link when user is logged out', () => {
    render(
      <AppContext.Provider value={{ user: defaultUser, logOut: jest.fn() }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
  });

  test('displays "Contact us" link when user is logged in', () => {
    render(
      <AppContext.Provider value={{ user: loggedInUser, logOut: jest.fn() }}>
        <Footer />
      </AppContext.Provider>
    );
    const contactLink = screen.getByText(/contact us/i);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.tagName).toBe('A');
  });
});
