import { createSelector } from '@reduxjs/toolkit';

const selectNotifications = createSelector(
  function (state) {
    return state.notifications;
  },
  function (notifications) {
    return Object.keys(notifications).map((id) => ({
      id,
      message: notifications[id],
    }));
  },
);

export { selectNotifications };
