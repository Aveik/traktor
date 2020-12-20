import { combineReducers } from 'redux';

import connections from './connections/connections.slice';
import lists from './lists/lists.slice';
import ratings from './ratings/ratings.slice';
import recommendations from './recommendations/recommendations.slice';
import watchlist from './watchlist/watchlist.slice';

export default combineReducers({
  connections,
  lists,
  ratings,
  recommendations,
  watchlist,
});
