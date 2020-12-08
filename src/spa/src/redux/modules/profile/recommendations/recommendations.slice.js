import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchRecommendations = createAsyncThunk(
  'profile/recommendations/fetch',
  async function (type, { rejectWithValue }) {
    try {
      const response = await axios.get('/sync/recommendations');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

function postRecommendation(entity) {
  return async function (slug, { rejectWithValue }) {
    try {
      await axios.post('/sync/recommendations', {
        [entity]: [{ ids: { slug } }],
      });
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  };
}

function removeRecommendation(entity) {
  return async function (slug, { rejectWithValue }) {
    try {
      await axios.post('/sync/recommendations/remove', {
        [entity]: [{ ids: { slug } }],
      });
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  };
}

const postMovieRecommendation = createAsyncThunk(
  'profile/recommendation/recommend',
  postRecommendation('movies'),
);

const postShowRecommendation = createAsyncThunk(
  'profile/recommendation/recommend',
  postRecommendation('shows'),
);

const removeMovieRecommendation = createAsyncThunk(
  'profile/recommendation/unrecommend',
  removeRecommendation('movies'),
);

const removeShowRecommendation = createAsyncThunk(
  'profile/recommendation/unrecommend',
  removeRecommendation('shows'),
);

const { reducer } = createSlice({
  extraReducers: {
    [fetchRecommendations.fulfilled](state, action) {
      return action.payload;
    },
  },
  initialState: [],
  name: 'profile/recommendations',
  reducers: {},
});

export {
  fetchRecommendations,
  postMovieRecommendation,
  postShowRecommendation,
  removeMovieRecommendation,
  removeShowRecommendation,
};
export default reducer;
