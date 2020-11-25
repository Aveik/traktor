import { createSelector } from '@reduxjs/toolkit';

function selector(state) {
  return state.notifications;
}

const selectNotifications = createSelector(selector, function (notifications) {
  return Object.keys(notifications).map((id) => ({
    id,
    message: notifications[id],
  }));
});

export { selectNotifications };
