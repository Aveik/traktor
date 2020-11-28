import { createSelector } from '@reduxjs/toolkit';

const selectEntity = createSelector(
  function (state) {
    return state.person;
  },
  function (entity) {
    return entity;
  },
);

export { selectEntity };
