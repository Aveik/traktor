import { createSelector } from '@reduxjs/toolkit';

const selectMovies = createSelector(
  function (state) {
    return state.movies;
  },
  function (movies) {
    return movies.entities;
  },
);

const selectPagesTotal = createSelector(
  function (state) {
    return state.movies.pagination.total;
  },
  function (pagesTotal) {
    return pagesTotal;
  },
);

export { selectMovies, selectPagesTotal };
