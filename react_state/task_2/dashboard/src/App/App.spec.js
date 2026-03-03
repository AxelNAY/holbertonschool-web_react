import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App - default rendering', () => {
  test('renders Login form by default (user not logged in)', () => {
    const { container } = render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(container.querySelector('#CourseList')).toBeNull();
  });

  test('displays "News from the School" block with its paragraph by default', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 2, name: /News from the School/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/ipsum Lorem ipsum dolor sit amet consectetur/i)).toBeInTheDocument();
  });
});

describe('App - login / logout flow', () => {
  function loginUser() {
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
  }

  test('renders CourseList after submitting valid credentials', () => {
    const { container } = render(<App />);
    loginUser();
    expect(container.querySelector('#CourseList')).not.toBeNull();
    expect(screen.queryByLabelText(/email/i)).toBeNull();
  });

  test('returns to Login form after logOut resets the state', () => {
    render(<App />);
    loginUser();
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});

describe('App - lifecycle & keyboard', () => {
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
