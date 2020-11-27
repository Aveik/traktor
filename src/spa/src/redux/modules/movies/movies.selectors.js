import { createSelector } from '@reduxjs/toolkit';

const selectMovies = createSelector(
  function (state) {
    return state.movies;
  },
  function (movies) {
    return movies.entities;
  },
);

export { selectMovies };
