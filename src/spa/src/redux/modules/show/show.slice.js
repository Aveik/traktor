import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchComments = createAsyncThunk('show/comments/fetch', async function (
  { limit, slug, sort },
  { rejectWithValue },
) {
  try {
    const response = await axios.get(
      `/trakt/shows/${slug}/comments/${sort}?page=1&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const fetchShow = createAsyncThunk('show/fetch', async function (
  slug,
  { rejectWithValue },
) {
  try {
    const [
      summaryResponse,
      commentsResponse,
      peopleResponse,
      ratingsResponse,
      relatedResponse,
      statsResponse,
      seasonsResponse,
    ] = await Promise.all([
      axios.get(`/trakt/shows/${slug}`),
      axios.get(`/trakt/shows/${slug}/comments/highest`),
      axios.get(`/trakt/shows/${slug}/people`),
      axios.get(`/trakt/shows/${slug}/ratings`),
      axios.get(`/trakt/shows/${slug}/related`),
      axios.get(`/trakt/shows/${slug}/stats`),
      axios.get(`/trakt/shows/${slug}/seasons?extended=episodes`),
    ]);
    return {
      comments: commentsResponse.data,
      people: peopleResponse.data,
      ratings: ratingsResponse.data,
      related: relatedResponse.data,
      seasons: seasonsResponse.data,
      stats: statsResponse.data,
      summary: summaryResponse.data,
    };
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchComments.fulfilled](state, action) {
      state.comments = action.payload;
    },
    [fetchShow.fulfilled](state, action) {
      return action.payload;
    },
  },
  initialState: {
    comments: [],
    people: null,
    ratings: null,
    related: [],
    seasons: [],
    stats: null,
    summary: null,
  },
  name: 'show',
  reducers: {},
});

export { fetchComments, fetchShow };
export default reducer;
