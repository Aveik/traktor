import { configureStore } from '@reduxjs/toolkit';

import loading from './loading/loading.slice';
import movies from './modules/movies/movies.slice';
import profile from './modules/profile/profile.slice';
import search from './modules/search/search.slice';
import shows from './modules/shows/shows.slice';
import notifications from './notifications/notifications.slice';

const store = configureStore({
  reducer: {
    loading,
    movies,
    notifications,
    profile,
    search,
    shows,
  },
});

export default store;
