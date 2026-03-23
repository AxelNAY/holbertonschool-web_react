import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

const loggedOutUser = { email: '', password: '', isLoggedIn: false };
const loggedInUser = { email: 'test@example.com', password: 'password', isLoggedIn: true };

describe('Header', () => {
  test('renders the title', () => {
    render(<Header user={loggedOutUser} logOut={() => {}} />);
    expect(screen.getByRole('heading', { name: /school dashboard/i })).toBeInTheDocument();
  });

  test('renders the Holberton logo with alt text', () => {
    render(<Header user={loggedOutUser} logOut={() => {}} />);
    const img = screen.getByAltText(/holberton logo/i);
    expect(img).toBeInTheDocument();
    expect(img.closest('.App-header')).toBeInTheDocument();
  });

  test('does not render logoutSection when user is logged out', () => {
    render(<Header user={loggedOutUser} logOut={() => {}} />);
    expect(document.querySelector('#logoutSection')).not.toBeInTheDocument();
  });

  test('renders logoutSection when isLoggedIn is true', () => {
    render(<Header user={loggedInUser} logOut={() => {}} />);
    expect(document.querySelector('#logoutSection')).toBeInTheDocument();
  });

  test('calls logOut when logout link is clicked', () => {
    const logOutSpy = jest.fn();
    render(<Header user={loggedInUser} logOut={logOutSpy} />);
    fireEvent.click(screen.getByText('logout'));
    expect(logOutSpy).toHaveBeenCalledTimes(1);
  });
});
