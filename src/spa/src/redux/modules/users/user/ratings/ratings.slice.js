import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  filterOutUnsupportedEntityTypes,
  getUserSlug,
} from '../../../../../utils';
import { isForLoggedUser } from '../../utils';

const fetchRatings = createAsyncThunk('users/ratings/fetch', async function (
  userSlug = getUserSlug(),
  { rejectWithValue },
) {
  try {
    const response = await axios.get(
      `/trakt/users/${userSlug}/ratings?page=1&limit=10`,
    );
    return filterOutUnsupportedEntityTypes(response.data);
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchRatings.fulfilled](state, action) {
      if (isForLoggedUser(action.meta.arg)) {
        return state;
      }
      return action.payload;
    },
  },
  initialState: [],
  name: 'users/ratings',
  reducers: {},
});

export { fetchRatings };
export default reducer;
