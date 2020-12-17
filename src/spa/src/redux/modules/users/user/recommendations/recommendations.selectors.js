import { createSelector } from '@reduxjs/toolkit';

const selectEntities = createSelector(
  function (state) {
    return state.users.user.recommendations;
  },
  function (recommendations) {
    return recommendations;
  },
);

export { selectEntities };
