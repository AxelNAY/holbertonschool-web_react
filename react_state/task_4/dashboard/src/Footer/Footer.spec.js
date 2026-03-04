import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';
import newContext from '../Context/context';

const renderWithContext = (contextValue) =>
  render(
    <newContext.Provider value={contextValue}>
      <Footer />
    </newContext.Provider>
  );

describe('Footer', () => {
  test('renders copyright with current year', () => {
    renderWithContext({ user: { isLoggedIn: false } });
    const year = new Date().getFullYear().toString();

    const p = screen.getByText(/copyright/i);
    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent(year);
  });

  test('does not display "Contact us" link when user is logged out', () => {
    renderWithContext({ user: { isLoggedIn: false } });
    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
  });

  test('displays "Contact us" link when user is logged in', () => {
    renderWithContext({ user: { isLoggedIn: true } });
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });
});
