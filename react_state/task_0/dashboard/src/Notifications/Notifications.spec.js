import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils.js";

describe("Notifications", () => {
  const mockNotifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    {
      id: 3,
      type: "urgent",
      html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" },
    },
  ];

  test("Check the existence of the notifications title Here is the list of notifications", () => {
    render(
      <Notifications notifications={mockNotifications} displayDrawer={true} />
    );
    const notiftitle = screen.getByText(/Here is the list of notifications/i);

    expect(notiftitle).toBeInTheDocument();
  });

  test("Check the existence of the button element in the notifications", () => {
    render(
      <Notifications notifications={mockNotifications} displayDrawer={true} />
    );
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  test("Verify that there are 3 li elements as notifications rendered", () => {
    render(
      <Notifications notifications={mockNotifications} displayDrawer={true} />
    );
    const lielements = screen.getAllByRole("listitem");

    expect(lielements.length).toBe(3);
  });

  test('Check whether clicking the close button logs "Close button has been clicked" to the console.', () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(
      <Notifications notifications={mockNotifications} displayDrawer={true} />
    );
    const button = screen.getByRole("button", { name: /close/i });
    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith("Close button has been clicked");

    consoleSpy.mockRestore();
  });

  test('Clicking a notification item logs "Notification {id} has been marked as read"', () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(
      <Notifications notifications={mockNotifications} displayDrawer={true} />
    );

    fireEvent.click(screen.getByText("New resume available"));

    expect(spy).toHaveBeenCalledWith("Notification 2 has been marked as read");

    spy.mockRestore();
  });
});

describe("Whenever the prop displayDrawer set to false", () => {
  test("Check that the Notifications component doesn t displays the elements", () => {
    const notifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
    ];
    render(
      <Notifications notifications={notifications} displayDrawer={false} />
    );

    expect(
      screen.queryByText("Here is the list of notifications")
    ).not.toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("clicking on the menu item calls handleDisplayDrawer", () => {
    const handleDisplayDrawer = jest.fn();
    render(
      <Notifications
        notifications={[]}
        displayDrawer={false}
        handleDisplayDrawer={handleDisplayDrawer}
      />
    );

    const menuItem = screen.getByText("Your notifications");
    fireEvent.click(menuItem);

    expect(handleDisplayDrawer).toHaveBeenCalled();
  });
});

describe("Whenever the the prop displayDrawer set to true", () => {
  test("Check that the Notifications component displays the elements", () => {
    const notifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
    ];
    render(
      <Notifications notifications={notifications} displayDrawer={true} />
    );

    expect(
      screen.queryByText("Here is the list of notifications")
    ).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(3);
    expect(screen.queryByRole("button")).toBeInTheDocument();
  });

  test("Check that the Notifications component displays the elements", () => {
    const notifications = [];
    render(
      <Notifications notifications={notifications} displayDrawer={true} />
    );

    expect(
      screen.queryByText("No new notification for now")
    ).toBeInTheDocument();
  });

  test("clicking on the close button calls handleHideDrawer", () => {
    const handleHideDrawer = jest.fn();
    const notifications = [
      { id: 1, type: "default", value: "Test notification" },
    ];
    render(
      <Notifications
        notifications={notifications}
        displayDrawer={true}
        handleHideDrawer={handleHideDrawer}
      />
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(handleHideDrawer).toHaveBeenCalled();
  });

  describe("Notifications (Task 7 - shouldComponentUpdate)", () => {
    test("doesn't re-render when notifications length stays the same", () => {
      const initial = [
        { id: 1, type: "default", value: "A" },
        { id: 2, type: "default", value: "B" },
      ];
      const { rerender } = render(
        <Notifications notifications={initial} displayDrawer={true} />
      );

      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("B")).toBeInTheDocument();

      const sameLenDifferentContent = [
        { id: 1, type: "default", value: "A" },
        { id: 2, type: "default", value: "B" },
      ];
      rerender(
        <Notifications
          notifications={sameLenDifferentContent}
          displayDrawer={true}
        />
      );

      // Should still show A and B (not re-rendered because length is same)
      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("B")).toBeInTheDocument();
    });

    test("re-renders when notifications length changes", () => {
      const initial = [
        { id: 1, type: "default", value: "A" },
        { id: 2, type: "default", value: "B" },
      ];
      const { rerender } = render(
        <Notifications notifications={initial} displayDrawer={true} />
      );

      const longer = [
        { id: 1, type: "default", value: "A" },
        { id: 2, type: "default", value: "B" },
        { id: 3, type: "default", value: "C" },
      ];
      rerender(<Notifications notifications={longer} displayDrawer={true} />);

      expect(screen.getByText("C")).toBeInTheDocument();
    });
  });
});
