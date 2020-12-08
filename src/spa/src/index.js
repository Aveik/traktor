import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.component';
import { fetchLists } from './redux/modules/profile/lists/lists.slice';
import { fetchRatings } from './redux/modules/profile/ratings/ratings.slice';
import { fetchRecommendations } from './redux/modules/profile/recommendations/recommendations.slice';
import { fetchWatchlist } from './redux/modules/profile/watchlist/watchlist.slice';
import store from './redux/store';

const { dispatch } = store;

//@TODO: Implement parallel initial calls
//@TODO: Add default loading state in public/index.html
async function init() {
  await dispatch(fetchLists());
  await dispatch(fetchRatings());
  await dispatch(fetchRecommendations());
  await dispatch(fetchWatchlist());
}

init().then(function () {
  ReactDOM.render(<App />, document.getElementById('root'));
});
