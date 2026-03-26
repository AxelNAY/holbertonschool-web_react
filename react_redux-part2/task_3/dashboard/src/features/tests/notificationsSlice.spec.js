import mockAxios from "jest-mock-axios";
import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
} from "../notifications/notificationsSlice";
import { configureStore } from "@reduxjs/toolkit";

describe("notificationsSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  const initialState = {
    notifications: [],
    loading: false,
  };

  it("should return the correct initial state by default", () => {
    expect(notificationsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should fetch only unread notifications and transform them correctly", async () => {
    const store = configureStore({
      reducer: { notifications: notificationsReducer },
    });

    const mockData = [
      {
        id: "1",
        context: { isRead: false, type: "default", value: "New course available" },
      },
      {
        id: "2",
        context: { isRead: false, type: "urgent", value: "New resume available" },
      },
      {
        id: "3",
        context: { isRead: true, type: "urgent", value: "Already read" },
      },
    ];

    const thunkPromise = store.dispatch(fetchNotifications());
    mockAxios.mockResponse({ data: mockData });
    await thunkPromise;

    const state = store.getState().notifications;
    expect(state.notifications).toHaveLength(2);
    expect(state.notifications[0]).toEqual({
      id: "1",
      type: "default",
      isRead: false,
      value: "New course available",
    });
    expect(state.notifications[1]).toEqual({
      id: "2",
      type: "urgent",
      isRead: false,
      value: "New resume available",
    });
  });

  it("should remove a notification when markNotificationAsRead is dispatched", () => {
    const stateWithNotifications = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
      ],
      loading: false,
    };

    const state = notificationsReducer(
      stateWithNotifications,
      markNotificationAsRead(1)
    );

    expect(state.notifications).toHaveLength(1);
    expect(state.notifications[0].id).toBe(2);
  });
});
