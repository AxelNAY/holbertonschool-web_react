import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  test('renders copyright with current year', () => {
    render(<Footer user={{ isLoggedIn: false }} />);
    const year = new Date().getFullYear().toString();
    const p = screen.getByText(/copyright/i);
    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent(year);
  });

  test('does not display "Contact us" link when user is logged out', () => {
    render(<Footer user={{ isLoggedIn: false }} />);
    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
  });

  test('displays "Contact us" link when user is logged in', () => {
    render(<Footer user={{ isLoggedIn: true }} />);
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });
});
