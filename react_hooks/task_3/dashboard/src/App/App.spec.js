import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App - default state', () => {
  test('renders Login form when not logged in (default state)', () => {
    const { container } = render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('does not show logoutSection when not logged in', () => {
    render(<App />);
    expect(document.querySelector('#logoutSection')).not.toBeInTheDocument();
  });

  test('displays "News from the School" block with its paragraph by default', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 2, name: /News from the School/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/ipsum Lorem ipsum dolor sit amet consectetur/i)).toBeInTheDocument();
  });
});

describe('App - login / logout flow (state changes)', () => {
  function loginUser() {
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
  }

  test('shows CourseList and logoutSection after login state change', () => {
    const { container } = render(<App />);
    loginUser();
    expect(container.querySelector('#CourseList')).not.toBeNull();
    expect(screen.queryByLabelText(/email/i)).toBeNull();
    expect(document.querySelector('#logoutSection')).toBeInTheDocument();
  });

  test('shows welcome message with email in logoutSection after login', () => {
    render(<App />);
    loginUser();
    expect(document.querySelector('#logoutSection')).toHaveTextContent('test@example.com');
  });

  test('returns to Login form after clicking logout link in header (state change)', () => {
    render(<App />);
    loginUser();
    fireEvent.click(screen.getByText('logout'));
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(document.querySelector('#logoutSection')).not.toBeInTheDocument();
  });

  test('returns to Login form after Ctrl+H logout (state change)', () => {
    render(<App />);
    loginUser();
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(document.querySelector('#logoutSection')).not.toBeInTheDocument();
  });
});

describe('App - markNotificationAsRead', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('clicking a notification removes it from the list and logs the expected message', () => {
    render(<App />);

    // Open the drawer first
    fireEvent.click(screen.getByText(/your notifications/i));

    // Notification with id=1 should be visible
    const notification = screen.getByText('New course available');
    expect(notification).toBeInTheDocument();

    // Click it to mark as read
    fireEvent.click(notification);

    // It should be removed from the list
    expect(screen.queryByText('New course available')).not.toBeInTheDocument();

    // Console should have logged the expected message
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
  });
});

describe('App - keyboard shortcut', () => {
  let alertSpy;

  beforeEach(() => {
    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    alertSpy.mockRestore();
  });

  test('alerts "Logging you out" when Ctrl+H is pressed', () => {
    render(<App />);
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
    expect(window.alert).toHaveBeenCalledWith('Logging you out');
  });
});
