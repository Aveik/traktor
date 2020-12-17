import { createSelector } from '@reduxjs/toolkit';

const selectEntities = createSelector(
  function (state) {
    return state.users.user.watchlist;
  },
  function (watchlist) {
    return watchlist;
  },
);

export { selectEntities };
