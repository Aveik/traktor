import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.component';
import { fetchRatings } from './redux/modules/profile/ratings/ratings.slice';
import store from './redux/store';

//@TODO: Figure out better way how to handle initial calls before loading React
function init(callback) {
  store.dispatch(fetchRatings()).then(function () {
    callback();
  });
}

init(function () {
  ReactDOM.render(<App />, document.getElementById('root'));
});
