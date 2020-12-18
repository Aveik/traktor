import { fetchFollowersAndFollowing } from './modules/users/profile/followers/followers.slice';
import { fetchLists } from './modules/users/user/lists/lists.slice';
import { fetchRatings } from './modules/users/user/ratings/ratings.slice';
import { fetchRecommendations } from './modules/users/user/recommendations/recommendations.slice';
import { fetchWatchlist } from './modules/users/user/watchlist/watchlist.slice';

function init() {
  return async function (dispatch) {
    await Promise.all([
      dispatch(fetchFollowersAndFollowing()),
      dispatch(fetchLists()),
      dispatch(fetchRatings()),
      dispatch(fetchRecommendations()),
      dispatch(fetchWatchlist()),
    ]);
  };
}

export default init;
