import { createSelector } from '@reduxjs/toolkit';

function selector(state) {
  return state.search;
}

const selectSearchResults = createSelector(selector, function (searchResults) {
  return searchResults.entities;
});

export { selectSearchResults };
