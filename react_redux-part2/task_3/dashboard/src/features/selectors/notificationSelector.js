import { createSelector } from "@reduxjs/toolkit";

const getNotifications = (state) => state.notifications.notifications;
const getFilter = (_, filter) => filter;

export const getFilteredNotifications = createSelector(
  [getNotifications, getFilter],
  (notifications, filter) => {
    if (filter === "all") return notifications;
    return notifications.filter((notification) => notification.type === filter);
  }
);
