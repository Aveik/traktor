import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchWatchlist = createAsyncThunk(
  'profile/watchlist/fetch',
  async function (type, { rejectWithValue }) {
    try {
      const response = await axios.get('/sync/watchlist');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

function addToWatchlist(entity) {
  return async function (slug, { rejectWithValue }) {
    try {
      await axios.post('/sync/watchlist', {
        [entity]: [{ ids: { slug } }],
      });
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  };
}

function removeFromWatchlist(entity) {
  return async function (slug, { rejectWithValue }) {
    try {
      await axios.post('/sync/watchlist/remove', {
        [entity]: [{ ids: { slug } }],
      });
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  };
}

const addMovieToWatchlist = createAsyncThunk(
  'profile/watchlist/add',
  addToWatchlist('movies'),
);

const addShowToWatchlist = createAsyncThunk(
  'profile/watchlist/add',
  addToWatchlist('shows'),
);

const removeMovieFromWatchlist = createAsyncThunk(
  'profile/watchlist/remove',
  removeFromWatchlist('movies'),
);

const removeShowFromWatchlist = createAsyncThunk(
  'profile/watchlist/remove',
  removeFromWatchlist('shows'),
);

const { reducer } = createSlice({
  extraReducers: {
    [fetchWatchlist.fulfilled](state, action) {
      return action.payload;
    },
  },
  initialState: [],
  name: 'profile/watchlist',
  reducers: {},
});

export {
  addMovieToWatchlist,
  addShowToWatchlist,
  fetchWatchlist,
  removeMovieFromWatchlist,
  removeShowFromWatchlist,
};
export default reducer;
