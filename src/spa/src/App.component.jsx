import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Layout from './components/Layout/Layout.component';
import NotFound from './components/NotFound/NotFound.component';
import Movies from './modules/Movies/Movies.component';
import MovieDetail from './modules/Movies/Single/Single.component';
import People from './modules/People/People.component';
import PeopleDetail from './modules/People/Single/Single.component';
import Comments from './modules/Profile/Comments/Comments.component';
import Lists from './modules/Profile/Lists/Lists.component';
import ListDetail from './modules/Profile/Lists/Single/Single.component';
import Profile from './modules/Profile/Profile.component';
import Ratings from './modules/Profile/Ratings/Ratings.component';
import Recommendations from './modules/Profile/Recommendations/Recommendations.component';
import Watchlist from './modules/Profile/Watchlist/Watchlist.component';
import Search from './modules/Search/Search.component';
import Shows from './modules/Shows/Shows.component';
import ShowDetail from './modules/Shows/Single/Single.component';
import store from './redux/store';

// In case of any routing change, make sure to reflect the exact change
// in file ./src/components/Layouts/Layouts/Layouts.utils.js in variable NAV_PATHS
function App() {
  return (
    <Routes basename='/app'>
      <Route element={<Navigate replace to='movies/trending' />} path='/' />
      <Route element={<Layout />} path='/'>
        <Route path='movies'>
          <Route element={<Navigate replace to='trending' />} path='/' />
          <Route element={<Movies category='trending' />} path='trending' />
          <Route element={<Movies category='popular' />} path='popular' />
          <Route
            element={<Movies category='recommended' />}
            path='recommended'
          />
          <Route element={<Movies category='watched' />} path='watched' />
          <Route element={<Movies category='collected' />} path='collected' />
          <Route
            element={<Movies category='anticipated' />}
            path='anticipated'
          />
          <Route element={<MovieDetail />} path=':id' />
        </Route>
        <Route path='shows'>
          <Route element={<Shows category='trending' />} path='trending' />
          <Route element={<Shows category='popular' />} path='popular' />
          <Route
            element={<Shows category='recommended' />}
            path='recommended'
          />
          <Route element={<Shows category='watched' />} path='watched' />
          <Route element={<Shows category='collected' />} path='collected' />
          <Route
            element={<Shows category='anticipated' />}
            path='anticipated'
          />
          <Route element={<ShowDetail />} path=':id' />
        </Route>
        <Route path='people'>
          <Route element={<People />} path='/' />
          <Route element={<PeopleDetail />} path=':id' />
        </Route>
        <Route path='search'>
          <Route element={<Search />} path='/' />
          <Route element={<Search type='movies' />} path='movies' />
          <Route element={<Search type='shows' />} path='shows' />
          <Route element={<Search type='people' />} path='people' />
        </Route>
        <Route path='profile'>
          <Route element={<Profile />} path='/overview' />
          <Route element={<Ratings />} path='ratings' />
          <Route element={<Recommendations />} path='recommendations' />
          <Route element={<Watchlist />} path='watchlist' />
          <Route path='lists'>
            <Route element={<Lists />} path='/' />
            <Route element={<ListDetail />} path=':id' />
          </Route>
          <Route element={<Comments />} path='comments' />
        </Route>
      </Route>
      <Route element={<NotFound />} path='*' />
    </Routes>
  );
}

function Providers() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </ReduxProvider>
  );
}
export default Providers;
