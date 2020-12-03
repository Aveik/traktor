import {
  createMuiTheme,
  CssBaseline as MuiCssBaseline,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core';
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
import Movie from './modules/Movie/Movie.component';
import Movies from './modules/Movies/Movies.component';
import Person from './modules/Person/Person.component';
import Comments from './modules/Profile/Comments/Comments.component';
import List from './modules/Profile/List/List.component';
import Lists from './modules/Profile/Lists/Lists.component';
import Ratings from './modules/Profile/Ratings/Ratings.component';
import Recommendations from './modules/Profile/Recommendations/Recommendations.component';
import Watchlist from './modules/Profile/Watchlist/Watchlist.component';
import Search from './modules/Search/Search.component';
import Show from './modules/Show/Show.component';
import Shows from './modules/Shows/Shows.component';
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
          <Route element={<Movie />} path=':slug' />
        </Route>
        <Route path='shows'>
          <Route element={<Navigate replace to='trending' />} path='/' />
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
          <Route element={<Show />} path=':slug' />
        </Route>
        <Route element={<Person />} path='people/:slug' />
        <Route path='search'>
          <Route element={<Navigate replace to='all' />} path='/' />
          <Route element={<Search type='all' />} path='all' />
          <Route element={<Search type='movies' />} path='movies' />
          <Route element={<Search type='shows' />} path='shows' />
          <Route element={<Search type='people' />} path='people' />
        </Route>
        <Route path='profile'>
          <Route element={<Navigate replace to='ratings' />} path='/' />
          <Route element={<Ratings />} path='ratings' />
          <Route element={<Recommendations />} path='recommendations' />
          <Route element={<Watchlist />} path='watchlist' />
          <Route path='lists'>
            <Route element={<Lists />} path='/' />
            <Route element={<List />} path=':id' />
          </Route>
          <Route element={<Comments />} path='comments' />
        </Route>
      </Route>
      <Route element={<NotFound />} path='*' />
    </Routes>
  );
}
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function Providers() {
  return (
    <ReduxProvider store={store}>
      <MuiThemeProvider theme={darkTheme}>
        <Router>
          <MuiCssBaseline />
          <App />
        </Router>
      </MuiThemeProvider>
    </ReduxProvider>
  );
}
export default Providers;
