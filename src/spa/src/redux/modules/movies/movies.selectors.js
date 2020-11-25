import { createSelector } from '@reduxjs/toolkit';

function selector(state) {
  return state.movies;
}

const selectMovies = createSelector(selector, function (movies) {
  return movies.entities;
});

export { selectMovies };
