import { createSelector } from '@reduxjs/toolkit';

const selectEntities = createSelector(
  function (state) {
    return state.profile.watchlist;
  },
  function (watchlist) {
    return watchlist;
  },
);

const selectIsWatchlisted = createSelector(
  [
    function (state) {
      return state.profile.watchlist;
    },
    function (_, type) {
      return type;
    },
    function (_, __, slug) {
      return slug;
    },
  ],
  function (watchlist, type, slug) {
    const result = watchlist.find(
      (item) => item.type === type && item[type].ids.slug === slug,
    );
    return Boolean(result);
  },
);

export { selectEntities, selectIsWatchlisted };
