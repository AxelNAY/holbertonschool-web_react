import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import AppContext from '../Context/context';

describe('Header', () => {
  test('renders the title', () => {
    render(<Header />);
    expect(screen.getByRole('heading', { name: /school dashboard/i })).toBeInTheDocument();
  });

  test('renders the Holberton logo with alt text', () => {
    render(<Header />);
    const img = screen.getByAltText(/holberton logo/i);
    expect(img).toBeInTheDocument();
    expect(img.closest('.App-header')).toBeInTheDocument();
  });

  test('does not render logoutSection with default context', () => {
    render(<Header />);
    expect(document.querySelector('#logoutSection')).not.toBeInTheDocument();
  });

  test('renders logoutSection when isLoggedIn is true', () => {
    const contextValue = {
      user: { email: 'test@example.com', password: 'password', isLoggedIn: true },
      logOut: () => {},
    };
    render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    expect(document.querySelector('#logoutSection')).toBeInTheDocument();
  });

  test('calls logOut spy when logout link is clicked', () => {
    const logOutSpy = jest.fn();
    const contextValue = {
      user: { email: 'test@example.com', password: 'password', isLoggedIn: true },
      logOut: logOutSpy,
    };
    render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    fireEvent.click(screen.getByText('logout'));
    expect(logOutSpy).toHaveBeenCalledTimes(1);
  });
});
