import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.jsx";

describe("App local state for notifications", () => {
  test("displayDrawer is false by default", () => {
    render(<App />);
    expect(screen.getByTestId("menu-item")).toBeInTheDocument();
    expect(screen.queryByTestId("close-btn")).toBeNull();
  });

  test('clicking on "Your notifications" opens the drawer', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("menu-item"));
    expect(screen.getByTestId("close-btn")).toBeInTheDocument();
  });

  test("clicking the close button hides the drawer", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("menu-item"));
    const closeBtn = screen.getByTestId("close-btn");
    fireEvent.click(closeBtn);
    expect(screen.getByTestId("menu-item")).toBeInTheDocument();
    expect(screen.queryByTestId("close-btn")).toBeNull();
  });

  test("clicking a notification removes it and logs the correct message", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<App />);
    fireEvent.click(screen.getByTestId("menu-item"));
    const notificationItem = screen.getByText(/New course available/i);
    fireEvent.click(notificationItem);
    expect(
      screen.queryByText(/New course available/i)
    ).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Notification 1 has been marked as read"
    );
    consoleSpy.mockRestore();
  });
});

describe("App local state for login/logout", () => {
  test("Login component renders by default when user is not logged in", () => {
    render(<App />);
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
  });

  test("logoutSection is not displayed when user is not logged in", () => {
    render(<App />);
    const logoutSection = document.getElementById("logoutSection");
    expect(logoutSection).toBeNull();
  });

  test("after logging in, CourseList renders and Login unmounts", () => {
    render(<App />);

    // Fill in valid email and password
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /ok/i });
    fireEvent.click(submitButton);

    // Verify CourseList is rendered
    expect(screen.getByText(/course list/i)).toBeInTheDocument();
    expect(screen.getByText(/ES6/i)).toBeInTheDocument();

    // Verify Login is unmounted
    expect(screen.queryByText(/login to access the full dashboard/i)).not.toBeInTheDocument();
  });

  test("after logging in, Header displays logoutSection with user email", () => {
    render(<App />);

    // Log in
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    const submitButton = screen.getByRole("button", { name: /ok/i });
    fireEvent.click(submitButton);

    // Verify logoutSection is displayed
    const logoutSection = document.getElementById("logoutSection");
    expect(logoutSection).toBeInTheDocument();
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  test("clicking logout in Header logs the user out", () => {
    render(<App />);

    // Log in first
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    const submitButton = screen.getByRole("button", { name: /ok/i });
    fireEvent.click(submitButton);

    // Verify logged in state
    expect(screen.getByText(/course list/i)).toBeInTheDocument();

    // Click logout link in Header
    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);

    // Verify user is logged out
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
    expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();

    // Verify logoutSection is no longer displayed
    const logoutSection = document.getElementById("logoutSection");
    expect(logoutSection).toBeNull();
  });
});
