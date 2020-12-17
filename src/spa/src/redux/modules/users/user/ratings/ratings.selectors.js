import { createSelector } from '@reduxjs/toolkit';

const selectEntities = createSelector(
  function (state) {
    return state.users.user.ratings;
  },
  function (ratings) {
    return ratings;
  },
);

export { selectEntities };
