import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from '../utils/utils';
import '@testing-library/jest-dom';

jest.mock("./assets/close-button.png", () => "close-button.png");
jest.mock("./Notifications.css", () => ({}), { virtual: true });

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

describe("Notifications component (Task 7)", () => {
  test("renders the notifications title (case-insensitive)", () => {
    render(<Notifications />);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test("contains a Close button inside the notifications container", () => {
    const { container } = render(<Notifications />);
    const panel = container.querySelector(".Notifications");
    expect(panel).toBeTruthy();
    const closeBtn = screen.getByRole("button", { name: /close/i });
    expect(within(panel).getByRole("button", { name: /close/i })).toBe(closeBtn);
  });

  test("renders exactly 3 list items as notifications", () => {
  const { container } = render(<Notifications />);
  const panel = container.querySelector(".Notifications");
    const items = within(panel).getAllByRole("listitem");
  expect(items).toHaveLength(3);
});

  test("clicking the Close button logs the expected message", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<Notifications />);
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/close button has been clicked/i));
    spy.mockRestore();
  });

  test('renders 3 notification items with appropriate text', () => {
    const notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent',  value: 'New resume available' },
      { id: 3, type: 'urgent',  html: { __html: getLatestNotification() } },
    ];

    const { container } = render(<Notifications notifications={notificationsList} />);

    const list = container.querySelector('ul');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(3);

    expect(screen.getByText(/new course available/i)).toBeInTheDocument();
    expect(screen.getByText(/new resume available/i)).toBeInTheDocument();

    expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument();
    expect(screen.getByText(/complete by eod/i)).toBeInTheDocument();
  });
});
