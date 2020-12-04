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

function postRating(entity) {
  return async function ({ rating, slug }, { rejectWithValue }) {
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
  };
}

const postMovieRating = createAsyncThunk(
  'profile/ratings/rate',
  postRating('movies'),
);

const postShowRating = createAsyncThunk(
  'profile/ratings/rate',
  postRating('shows'),
);

function removeRating(entity) {
  return async function (slug, { rejectWithValue }) {
    try {
      await axios.post('/trakt/sync/ratings/remove', {
        [entity]: [{ ids: { slug } }],
      });
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  };
}

const removeMovieRating = createAsyncThunk(
  'profile/ratings/delete',
  removeRating('movies'),
);

const removeShowRating = createAsyncThunk(
  'profile/ratings/delete',
  removeRating('shows'),
);

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

export {
  fetchRatings,
  postMovieRating,
  postShowRating,
  removeMovieRating,
  removeShowRating,
};
export default reducer;
