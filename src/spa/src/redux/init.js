import { fetchLists } from './modules/users/lists/lists.slice';
import { fetchRatings } from './modules/users/ratings/ratings.slice';
import { fetchRecommendations } from './modules/users/recommendations/recommendations.slice';
import { fetchWatchlist } from './modules/users/watchlist/watchlist.slice';

function init() {
  return async function (dispatch) {
    await Promise.all([
      dispatch(fetchLists()),
      dispatch(fetchRatings()),
      dispatch(fetchRecommendations()),
      dispatch(fetchWatchlist()),
    ]);
  };
}

export default init;
