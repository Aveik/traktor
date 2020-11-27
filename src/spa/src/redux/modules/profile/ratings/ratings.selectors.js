import { createSelector } from '@reduxjs/toolkit';

const selectEntities = createSelector(
  function (state) {
    return state.profile.ratings;
  },
  function (ratings) {
    return ratings;
  },
);

export { selectEntities };
