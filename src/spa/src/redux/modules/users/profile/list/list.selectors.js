import { createSelector } from '@reduxjs/toolkit';

const selectEntity = createSelector(
  function (state) {
    return state.users.profile.list;
  },
  function (entity) {
    return entity;
  },
);

export { selectEntity };
