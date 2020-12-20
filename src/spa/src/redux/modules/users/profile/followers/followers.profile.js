import { createSelector } from '@reduxjs/toolkit';

const selectEntities = createSelector(
  function (state) {
    return state.users.profile.comments.entities;
  },
  function (comments) {
    return comments;
  },
);

function selectIsFollowedFactory() {
  return createSelector(
    function (state) {
      return state.users.profile.followers.following;
    },
    function (_, slug) {
      return slug;
    },
    function (following, slug) {
      const result = following.find((user) => user.slug === slug);
      return Boolean(result);
    },
  );
}

export { selectEntities, selectIsFollowedFactory };
