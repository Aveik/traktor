import { createSelector } from '@reduxjs/toolkit';

const selectEntities = createSelector(
  function (state) {
    return state.profile.recommendations;
  },
  function (recommendations) {
    return recommendations;
  },
);

const selectIsRecommended = createSelector(
  [
    function (state) {
      return state.profile.recommendations;
    },
    function (_, type) {
      return type;
    },
    function (_, __, slug) {
      return slug;
    },
  ],
  function (recommendations, type, slug) {
    const result = recommendations.find(
      (recommendation) =>
        recommendation.type === type && recommendation[type].ids.slug === slug,
    );
    return Boolean(result);
  },
);

export { selectEntities, selectIsRecommended };
