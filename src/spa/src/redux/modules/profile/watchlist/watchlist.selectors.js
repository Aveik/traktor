import { createSelector } from '@reduxjs/toolkit';

const selectEntities = createSelector(
  function (state) {
    return state.profile.watchlist;
  },
  function (watchlist) {
    return watchlist;
  },
);

export { selectEntities };
