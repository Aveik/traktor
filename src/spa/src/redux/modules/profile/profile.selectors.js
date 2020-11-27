import { createSelector } from '@reduxjs/toolkit';

const selectComments = createSelector(
  function (state) {
    return state.profile.comments.entities;
  },
  function (comments) {
    return comments;
  },
);

const selectCommentsPagesTotal = createSelector(
  function (state) {
    return state.profile.comments.pagination.total;
  },
  function (pagesTotal) {
    return pagesTotal;
  },
);

const selectLists = createSelector(
  function (state) {
    return state.profile.lists;
  },
  function (lists) {
    return lists;
  },
);

const selectRatings = createSelector(
  function (state) {
    return state.profile.ratings;
  },
  function (ratings) {
    return ratings;
  },
);

const selectRecommendations = createSelector(
  function (state) {
    return state.profile.recommendations;
  },
  function (recommendations) {
    return recommendations;
  },
);

const selectWatchlist = createSelector(
  function (state) {
    return state.profile.watchlist;
  },
  function (watchlist) {
    return watchlist;
  },
);

export {
  selectComments,
  selectCommentsPagesTotal,
  selectLists,
  selectRatings,
  selectRecommendations,
  selectWatchlist,
};
