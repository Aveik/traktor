import { createSelector } from '@reduxjs/toolkit';

const selectEntity = createSelector(
  function (state) {
    return state.movie;
  },
  function (entity) {
    return entity;
  },
);

export { selectEntity };
