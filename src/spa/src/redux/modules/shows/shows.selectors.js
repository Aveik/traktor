import { createSelector } from '@reduxjs/toolkit';

function selector(state) {
  return state.shows;
}

const selectShows = createSelector(selector, function (shows) {
  return shows.entities;
});

export { selectShows };
