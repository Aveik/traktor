import { createSelector } from '@reduxjs/toolkit';

const selectEntities = createSelector(
  function (state) {
    return state.profile.lists;
  },
  function (lists) {
    return lists;
  },
);

export { selectEntities };
