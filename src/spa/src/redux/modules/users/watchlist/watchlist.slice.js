import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserSlug } from '../../../../utils';

const fetchWatchlist = createAsyncThunk(
  'users/watchlist/fetch',
  async function (userSlug = getUserSlug(), { rejectWithValue }) {
    try {
      const response = await axios.get(`/trakt/users/${userSlug}/watchlist`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

const addToWatchlist = createAsyncThunk('users/watchlist/add', async function (
  { entity, slug },
  { rejectWithValue },
) {
  try {
    await axios.post('/trakt/sync/watchlist', {
      [entity]: [{ ids: { slug } }],
    });
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const removeFromWatchlist = createAsyncThunk(
  'users/watchlist/remove',
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

function addToWatchlistAndRefetch(params) {
  return async function (dispatch) {
    await dispatch(addToWatchlist(params));
    await dispatch(fetchWatchlist());
  };
}

function removeFromWatchlistAndRefetch(params) {
  return async function (dispatch) {
    await dispatch(removeFromWatchlist(params));
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
  name: 'users/watchlist',
  reducers: {},
});

export {
  addToWatchlistAndRefetch,
  fetchWatchlist,
  removeFromWatchlistAndRefetch,
};
export default reducer;
