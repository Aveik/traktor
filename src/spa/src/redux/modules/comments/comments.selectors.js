import { createSelector } from '@reduxjs/toolkit';

const selectEntities = createSelector(
  function (state) {
    return state.comments.entities;
  },
  function (entities) {
    return entities;
  },
);

const selectPagesTotal = createSelector(
  function (state) {
    return state.comments.pagination.total;
  },
  function (pagesTotal) {
    return pagesTotal;
  },
);

export { selectEntities, selectPagesTotal };
