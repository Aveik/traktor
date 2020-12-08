import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchRatings = createAsyncThunk('profile/ratings/fetch', async function (
  type,
  { rejectWithValue },
) {
  try {
    const response = await axios.get('/trakt/sync/ratings');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const postRating = createAsyncThunk('profile/ratings/rate', async function (
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

const removeRating = createAsyncThunk('profile/ratings/remove', async function (
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
  name: 'profile/ratings',
  reducers: {},
});

export { fetchRatings, postRating, removeRating };
export default reducer;
