import { createSelector } from '@reduxjs/toolkit';

const selectEntities = createSelector(
  function (state) {
    return state.users.profile.comments.entities;
  },
  function (comments) {
    return comments;
  },
);

const selectPagesTotal = createSelector(
  function (state) {
    return state.users.profile.comments.pagination.total;
  },
  function (pagesTotal) {
    return pagesTotal;
  },
);

export { selectEntities, selectPagesTotal };
