import { createSelector } from '@reduxjs/toolkit';

const selectShows = createSelector(
  function (state) {
    return state.shows;
  },
  function (shows) {
    return shows.entities;
  },
);

const selectPagesTotal = createSelector(
  function (state) {
    return state.shows.pagination.total;
  },
  function (pagesTotal) {
    return pagesTotal;
  },
);

export { selectPagesTotal, selectShows };
