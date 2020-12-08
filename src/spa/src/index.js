import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.component';
import { selectAccessToken } from './redux/auth/auth.selectors';
import { fetchMe } from './redux/auth/auth.slice';
import { fetchLists } from './redux/modules/profile/lists/lists.slice';
import { fetchRatings } from './redux/modules/profile/ratings/ratings.slice';
import { fetchRecommendations } from './redux/modules/profile/recommendations/recommendations.slice';
import { fetchWatchlist } from './redux/modules/profile/watchlist/watchlist.slice';
import store from './redux/store';

const { dispatch, getState } = store;

//@TODO: Add loading flare to public/index.html to indicate pre-loading and remove afterwards
//@TODO: Fetch request in parallel
async function init() {
  axios.interceptors.request.use(function (config) {
    const filter = ['/auth'];
    if (!filter.some((url) => config.url.startsWith(url))) {
      // Target is Trakt.tv API, add authorization headers
      config.baseURL = process.env.REACT_APP_TRAKT_API;
      config.headers.Authorization = `Bearer ${selectAccessToken(getState())}`;
      config.headers['trakt-api-key'] =
        process.env.REACT_APP_TRAKT_TV_CLIENT_ID;
    }
    return config;
  });
  await dispatch(fetchMe());
  await dispatch(fetchLists());
  await dispatch(fetchRatings());
  await dispatch(fetchRecommendations());
  await dispatch(fetchWatchlist());
}

init().then(function () {
  ReactDOM.render(<App />, document.getElementById('root'));
});
