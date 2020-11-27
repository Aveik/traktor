import { createSelector } from '@reduxjs/toolkit';

const selectSearchResults = createSelector(
  function (state) {
    return state.search;
  },
  function (searchResults) {
    return searchResults.entities;
  },
);

export { selectSearchResults };
