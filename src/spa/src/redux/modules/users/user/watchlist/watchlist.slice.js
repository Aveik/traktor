import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  filterOutUnsupportedEntityTypes,
  getUserSlug,
} from '../../../../../utils';
import { isForLoggedUser } from '../../utils';

const fetchWatchlist = createAsyncThunk(
  'users/watchlist/fetch',
  async function (userSlug = getUserSlug(), { rejectWithValue }) {
    try {
      const response = await axios.get(
        `/trakt/users/${userSlug}/watchlist?extended=full`,
      );
      return filterOutUnsupportedEntityTypes(response.data);
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

const { reducer } = createSlice({
  extraReducers: {
    [fetchWatchlist.fulfilled](state, action) {
      if (isForLoggedUser(action.meta.arg)) {
        return state;
      }
      return action.payload;
    },
  },
  initialState: [],
  name: 'users/watchlist',
  reducers: {},
});

export { fetchWatchlist };
export default reducer;
