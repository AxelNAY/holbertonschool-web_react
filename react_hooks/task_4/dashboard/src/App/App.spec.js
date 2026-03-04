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

describe('App - handleDisplayDrawer and handleHideDrawer', () => {
  test('drawer is open by default (displayDrawer initializes to true)', () => {
    render(<App />);
    expect(screen.getByRole('region', { name: /notifications/i })).toBeInTheDocument();
  });

  test('handleHideDrawer closes the drawer when the Close button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('region', { name: /notifications/i })).not.toBeInTheDocument();
  });

  test('handleDisplayDrawer re-opens the drawer when "Your notifications" is clicked', () => {
    render(<App />);
    // Close first
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('region', { name: /notifications/i })).not.toBeInTheDocument();
    // Re-open
    fireEvent.click(screen.getByText(/your notifications/i));
    expect(screen.getByRole('region', { name: /notifications/i })).toBeInTheDocument();
  });
});

describe('App - logIn state mutations', () => {
  function loginUser(email = 'test@example.com', password = 'password123') {
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: email } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: password } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
  }

  test('logIn sets isLoggedIn to true — CourseList appears and Login form disappears', () => {
    const { container } = render(<App />);
    loginUser();
    expect(container.querySelector('#CourseList')).not.toBeNull();
    expect(screen.queryByLabelText(/email/i)).toBeNull();
  });

  test('logIn updates email in user state — logoutSection shows the email', () => {
    render(<App />);
    loginUser('user@test.com', 'mypassword1');
    expect(document.querySelector('#logoutSection')).toHaveTextContent('user@test.com');
  });

  test('logIn updates password in user state — submit is enabled only with valid credentials', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass1234' } });
    expect(screen.getByRole('button', { name: /ok/i })).not.toBeDisabled();
  });
});

describe('App - logOut state mutations', () => {
  function loginUser() {
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
  }

  test('logOut sets isLoggedIn to false — Login form returns', () => {
    render(<App />);
    loginUser();
    fireEvent.click(screen.getByText('logout'));
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(document.querySelector('#logoutSection')).not.toBeInTheDocument();
  });

  test('logOut clears email from user state — logoutSection is removed', () => {
    render(<App />);
    loginUser();
    expect(document.querySelector('#logoutSection')).toHaveTextContent('test@example.com');
    fireEvent.click(screen.getByText('logout'));
    expect(document.querySelector('#logoutSection')).not.toBeInTheDocument();
  });

  test('logOut clears password from user state — submit button is disabled after re-render', () => {
    render(<App />);
    loginUser();
    fireEvent.click(screen.getByText('logout'));
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
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
    // Drawer is open by default (displayDrawer initializes to true)
    const notification = screen.getByText('New course available');
    expect(notification).toBeInTheDocument();

    fireEvent.click(notification);

    expect(screen.queryByText('New course available')).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
  });
});
