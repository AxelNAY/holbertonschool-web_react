import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.jsx";

describe("App local state for notifications", () => {
  test("displayDrawer is false by default", () => {
    render(<App />);
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
    expect(screen.queryByTestId("close-btn")).toBeNull();
  });

  test('clicking on "Your notifications" opens the drawer', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Your notifications/i));
    expect(screen.getByTestId("close-btn")).toBeInTheDocument();
  });

  test("clicking the close button hides the drawer", () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Your notifications/i));
    const closeBtn = screen.getByTestId("close-btn");
    fireEvent.click(closeBtn);
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
    expect(screen.queryByTestId("close-btn")).toBeNull();
  });
});
