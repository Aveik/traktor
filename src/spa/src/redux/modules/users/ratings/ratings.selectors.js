import { createSelector } from '@reduxjs/toolkit';

import { transformEntityToSingular } from '../../../../utils';

const selectEntities = createSelector(
  function (state) {
    return state.users.ratings;
  },
  function (ratings) {
    return ratings;
  },
);

function selectRatingFactory() {
  return createSelector(
    [
      function (state) {
        return state.users.ratings;
      },
      function (_, entity) {
        return transformEntityToSingular(entity);
      },
      function (_, __, slug) {
        return slug;
      },
    ],
    function (ratings, entity, slug) {
      const result = ratings.find(
        (rating) => rating.type === entity && rating[entity].ids.slug === slug,
      );
      return result ? result.rating : 0;
    },
  );
}

export { selectEntities, selectRatingFactory };
