import { createSelector } from '@reduxjs/toolkit';

function selector(state) {
  return state.auth;
}

const selectAccessToken = createSelector(selector, function (auth) {
  return auth.accessToken;
});

const selectUserSlug = createSelector(selector, function (auth) {
  return auth.slug;
});

export { selectAccessToken, selectUserSlug };
