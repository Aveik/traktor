import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { fetchWatchlist } from '../../user/watchlist/watchlist.slice';
import { isForLoggedUser } from '../../utils';

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
      if (isForLoggedUser(action.meta.arg)) {
        return action.payload;
      }
      return state;
    },
  },
  initialState: [],
  name: 'users/watchlist',
  reducers: {},
});

export { addToWatchlistAndRefetch, removeFromWatchlistAndRefetch };
export default reducer;
