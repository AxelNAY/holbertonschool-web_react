import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications.jsx";

describe("Notifications interactions", () => {
  test("clicking on the menu item calls handleDisplayDrawer", () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    render(
      <Notifications
        displayDrawer={false}
        handleDisplayDrawer={onOpen}
        handleHideDrawer={onClose}
        notifications={[{ id: 1, type: "default", value: "foo" }]}
      />
    );

    fireEvent.click(screen.getByText(/Your notifications/i));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  test("clicking on the close button calls handleHideDrawer", () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    render(
      <Notifications
        displayDrawer={true}
        handleDisplayDrawer={onOpen}
        handleHideDrawer={onClose}
        notifications={[{ id: 1, type: "default", value: "foo" }]}
      />
    );

    fireEvent.click(screen.getByTestId("close-btn"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("component re-renders when displayDrawer changes (shouldComponentUpdate)", () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    const { rerender } = render(
      <Notifications
        displayDrawer={false}
        handleDisplayDrawer={onOpen}
        handleHideDrawer={onClose}
        notifications={[{ id: 1, type: "default", value: "foo" }]}
      />
    );

    // fermé => menu visible
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();

    // change prop: ouvert
    rerender(
      <Notifications
        displayDrawer={true}
        handleDisplayDrawer={onOpen}
        handleHideDrawer={onClose}
        notifications={[{ id: 1, type: "default", value: "foo" }]}
      />
    );
    expect(screen.getByTestId("close-btn")).toBeInTheDocument();

    // re-fermer
    rerender(
      <Notifications
        displayDrawer={false}
        handleDisplayDrawer={onOpen}
        handleHideDrawer={onClose}
        notifications={[{ id: 1, type: "default", value: "foo" }]}
      />
    );
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });
});
