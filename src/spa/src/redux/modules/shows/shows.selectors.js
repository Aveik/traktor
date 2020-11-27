import { createSelector } from '@reduxjs/toolkit';

const selectEntities = createSelector(
  function (state) {
    return state.shows.entities;
  },
  function (shows) {
    return shows;
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

export { selectEntities, selectPagesTotal };
