import { combineReducers } from 'redux';

import comments from './comments/comments.slice';
import lists from './lists/lists.slice';
import ratings from './ratings/ratings.slice';
import recommendations from './recommendations/recommendations.slice';
import watchlist from './watchlist/watchlist.slice';

export default combineReducers({
  comments,
  lists,
  ratings,
  recommendations,
  watchlist,
});
