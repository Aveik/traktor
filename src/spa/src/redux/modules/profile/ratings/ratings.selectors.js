import { createSelector } from '@reduxjs/toolkit';

const selectEntities = createSelector(
  function (state) {
    return state.profile.ratings;
  },
  function (ratings) {
    return ratings;
  },
);

const selectRating = createSelector(
  [
    function (state) {
      return state.profile.ratings;
    },
    function (_, type) {
      return type;
    },
    function (_, __, slug) {
      return slug;
    },
  ],
  function (ratings, type, slug) {
    const result = ratings.find(
      (rating) => rating.type === type && rating[type].ids.slug === slug,
    );
    return result ? result.rating : 0;
  },
);

export { selectEntities, selectRating };
