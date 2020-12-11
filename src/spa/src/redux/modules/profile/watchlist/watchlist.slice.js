import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchWatchlist = createAsyncThunk(
  'profile/watchlist/fetch',
  async function (type, { rejectWithValue }) {
    try {
      const response = await axios.get('/trakt/sync/watchlist');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

const addToWatchlist = createAsyncThunk(
  'profile/watchlist/add',
  async function ({ entity, slug }, { rejectWithValue }) {
    try {
      await axios.post('/trakt/sync/watchlist', {
        [entity]: [{ ids: { slug } }],
      });
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

const removeFromWatchlist = createAsyncThunk(
  'profile/watchlist/remove',
  async function ({ entity, slug }, { rejectWithValue }) {
    try {
      await axios.post('/trakt/sync/watchlist/remove', {
        [entity]: [{ ids: { slug } }],
      });
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

function addToWatchlistAndRefetch(args) {
  return async function (dispatch) {
    await dispatch(addToWatchlist(args));
    await dispatch(fetchWatchlist());
  };
}

function removeFromWatchlistAndRefetch(args) {
  return async function (dispatch) {
    await dispatch(removeFromWatchlist(args));
    await dispatch(fetchWatchlist());
  };
}

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
  addToWatchlistAndRefetch,
  fetchWatchlist,
  removeFromWatchlistAndRefetch,
};
export default reducer;
