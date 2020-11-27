import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserSlug } from '../../../utils';

const fetchComments = createAsyncThunk(
  'profile/comments/fetch',
  async function (type, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `/trakt/users/${getUserSlug()}/comments`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

const fetchLists = createAsyncThunk('profile/lists/fetch', async function (
  type,
  { rejectWithValue },
) {
  try {
    const response = await axios.get(`/trakt/users/${getUserSlug()}/lists`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

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

const fetchRecommendations = createAsyncThunk(
  'profile/recommendations/fetch',
  async function (type, { rejectWithValue }) {
    try {
      const response = await axios.get('/trakt/sync/recommendations');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

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

const { reducer } = createSlice({
  extraReducers: {
    [fetchComments.fulfilled](state, action) {
      state.comments = action.payload;
    },
    [fetchLists.fulfilled](state, action) {
      state.lists = action.payload;
    },
    [fetchRatings.fulfilled](state, action) {
      state.ratings = action.payload;
    },
    [fetchRecommendations.fulfilled](state, action) {
      state.recommendations = action.payload;
    },
    [fetchWatchlist.fulfilled](state, action) {
      state.watchlist = action.payload;
    },
  },
  initialState: {
    comments: [],
    lists: [],
    ratings: [],
    recommendations: [],
    watchlist: [],
  },
  name: 'profile',
  reducers: {},
});

export {
  fetchComments,
  fetchLists,
  fetchRatings,
  fetchRecommendations,
  fetchWatchlist,
};
export default reducer;
