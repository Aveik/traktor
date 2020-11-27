import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { DEFAULTS, getUserSlug } from '../../../utils';

const fetchComments = createAsyncThunk(
  'profile/comments/fetch',
  async function (page, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `/trakt/users/${getUserSlug()}/comments?page=${page}&limit=${
          DEFAULTS.PAGE_SIZE
        }`,
      );
      return {
        entities: response.data,
        total: parseInt(response.headers['x-pagination-page-count']),
      };
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
      state.comments.entities = action.payload.entities;
      state.comments.pagination.total = action.payload.total;
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
    comments: {
      entities: [],
      pagination: {
        total: 0,
      },
    },
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
