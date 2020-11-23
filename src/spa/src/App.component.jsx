import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import NotFound from './components/errors/NotFound/NotFound.component';
import {
  Comments,
  ListDetail,
  Lists,
  MovieDetail,
  Movies,
  People,
  PeopleDetail,
  Profile,
  Ratings,
  Recommendations,
  Search,
  ShowDetail,
  Shows,
  Watchlist,
} from './modules';

function App() {
  return (
    <Routes basename='/app'>
      <Route element={<Navigate replace to='movies/trending' />} path='/' />
      <Route path='movies'>
        <Route element={<Movies category='trending' />} path='trending' />
        <Route element={<Movies category='popular' />} path='popular' />
        <Route element={<Movies category='recommended' />} path='recommended' />
        <Route element={<Movies category='watched' />} path='watched' />
        <Route element={<Movies category='collected' />} path='collected' />
        <Route element={<Movies category='anticipated' />} path='anticipated' />
        <Route element={<MovieDetail />} path=':id' />
      </Route>
      <Route path='shows'>
        <Route element={<Shows category='trending' />} path='trending' />
        <Route element={<Shows category='popular' />} path='popular' />
        <Route element={<Shows category='recommended' />} path='recommended' />
        <Route element={<Shows category='watched' />} path='watched' />
        <Route element={<Shows category='collected' />} path='collected' />
        <Route element={<Shows category='anticipated' />} path='anticipated' />
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
        <Route element={<Profile />} path='/' />
        <Route element={<Ratings />} path='ratings' />
        <Route element={<Recommendations />} path='recommendations' />
        <Route element={<Watchlist />} path='watchlist' />
        <Route path='lists'>
          <Route element={<Lists />} path='/' />
          <Route element={<ListDetail />} path=':id' />
        </Route>
        <Route element={<Comments />} path='comments' />
      </Route>
      <Route element={<NotFound />} path='*' />
    </Routes>
  );
}

function Providers() {
  return (
    <Router>
      <App />
    </Router>
  );
}
export default Providers;
