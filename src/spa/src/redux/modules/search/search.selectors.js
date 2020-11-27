import { createSelector } from '@reduxjs/toolkit';

const selectSearchResults = createSelector(
  function (state) {
    return state.search.entities;
  },
  function (searchResults) {
    return searchResults;
  },
);

const selectPagesTotal = createSelector(
  function (state) {
    return state.search.pagination.total;
  },
  function (pagesTotal) {
    return pagesTotal;
  },
);

export { selectPagesTotal, selectSearchResults };
