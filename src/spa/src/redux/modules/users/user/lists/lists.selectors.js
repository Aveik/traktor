import { createSelector } from '@reduxjs/toolkit';

const selectEntities = createSelector(
  function (state) {
    return state.users.user.lists;
  },
  function (lists) {
    return lists;
  },
);

export { selectEntities };
