import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserSlug } from '../../../../utils';

const fetchRatings = createAsyncThunk('users/ratings/fetch', async function (
  userSlug = getUserSlug(),
  { rejectWithValue },
) {
  try {
    const response = await axios.get(`/trakt/users/${userSlug}/ratings`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const postRating = createAsyncThunk('users/ratings/rate', async function (
  { entity, rating, slug },
  { rejectWithValue },
) {
  try {
    await axios.post('/trakt/sync/ratings', {
      [entity]: [
        {
          ids: { slug },
          rating,
        },
      ],
    });
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const removeRating = createAsyncThunk('users/ratings/remove', async function (
  { entity, slug },
  { rejectWithValue },
) {
  try {
    await axios.post('/trakt/sync/ratings/remove', {
      [entity]: [{ ids: { slug } }],
    });
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchRatings.fulfilled](state, action) {
      return action.payload;
    },
  },
  initialState: [],
  name: 'users/ratings',
  reducers: {},
});

export { fetchRatings, postRating, removeRating };
export default reducer;
