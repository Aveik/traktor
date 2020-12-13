import { createSelector } from '@reduxjs/toolkit';

import { transformEntityToSingular } from '../../../../utils';

const selectEntities = createSelector(
  function (state) {
    return state.users.recommendations;
  },
  function (recommendations) {
    return recommendations;
  },
);

const selectIsRecommended = createSelector(
  [
    function (state) {
      return state.users.recommendations;
    },
    function (_, entity) {
      return transformEntityToSingular(entity);
    },
    function (_, __, slug) {
      return slug;
    },
  ],
  function (recommendations, entity, slug) {
    const result = recommendations.find(
      (recommendation) =>
        recommendation.type === entity &&
        recommendation[entity].ids.slug === slug,
    );
    return Boolean(result);
  },
);

export { selectEntities, selectIsRecommended };
