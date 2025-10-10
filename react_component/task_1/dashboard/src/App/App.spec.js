// src/App/App.spec.js
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App (Task 2) - sign in form', () => {
  test('renders two input elements (email and password)', () => {
    const { container } = render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelectorAll('input')).toHaveLength(2);
  });

  test('renders two labels with texts "Email" and "Password"', () => {
    render(<App />);
    expect(screen.getByText(/email/i).tagName).toBe('LABEL');
    expect(screen.getByText(/password/i).tagName).toBe('LABEL');
  });

  test('renders a button with text OK', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
  });
});

describe('App (Task 4)', () => {
  test('renders Login when isLoggedIn is false', () => {
    const { container } = render(<App isLoggedIn={false} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('renders CourseList when isLoggedIn is true', () => {
    const { container } = render(<App isLoggedIn />);
    expect(container.querySelector('#CourseList')).not.toBeNull();
    expect(screen.queryByLabelText(/email/i)).toBeNull();
    expect(screen.queryByLabelText(/password/i)).toBeNull();
  });
});

describe('App (Task 1) - lifecycle & keyboard', () => {
  let alertSpy;

  beforeEach(() => {
    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    alertSpy.mockRestore();
  });

  test('calls logOut once when Ctrl+H is pressed', () => {
    const logOut = jest.fn();
    render(<App logOut={logOut} />);
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
    expect(logOut).toHaveBeenCalledTimes(1);
  });

  test('alerts "Logging you out" when Ctrl+H is pressed', () => {
    render(<App />);
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
    expect(window.alert).toHaveBeenCalledWith('Logging you out');
  });
});
