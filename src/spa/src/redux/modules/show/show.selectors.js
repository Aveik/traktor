import { createSelector } from '@reduxjs/toolkit';

const selectEntity = createSelector(
  function (state) {
    return state.show;
  },
  function (entity) {
    return entity;
  },
);

export { selectEntity };
