import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getLatestNotification } from "../../utils/utils";

const API_BASE_URL = "http://localhost:5173";

const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

const initialState = {
  notifications: [],
  loading: false,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await axios.get(ENDPOINTS.notifications);
    const notifications = response.data.notifications.map((notification) => {
      if (notification.id === 3) {
        return {
          ...notification,
          html: { __html: getLatestNotification() },
        };
      }
      return notification;
    });
    return notifications;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      console.log(`Notification ${action.payload} has been marked as read`);
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { markNotificationAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
