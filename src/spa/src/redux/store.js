import { configureStore } from '@reduxjs/toolkit';

import loading from './loading/loading.slice';
import movie from './modules/movie/movie.slice';
import movies from './modules/movies/movies.slice';
import person from './modules/person/person.slice';
import profile from './modules/profile';
import search from './modules/search/search.slice';
import show from './modules/show/show.slice';
import shows from './modules/shows/shows.slice';
import notifications from './notifications/notifications.slice';

const store = configureStore({
  reducer: {
    loading,
    movie,
    movies,
    notifications,
    person,
    profile,
    search,
    show,
    shows,
  },
});

export default store;
