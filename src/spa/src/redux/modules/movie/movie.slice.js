import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchComments = createAsyncThunk('movie/comments/fetch', async function (
  { limit, slug, sort },
  { rejectWithValue },
) {
  try {
    const response = await axios.get(
      `/trakt/movies/${slug}/comments/${sort}?page=1&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const fetchMovie = createAsyncThunk('movie/fetch', async function (
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
    ] = await Promise.all([
      axios.get(`/trakt/movies/${slug}`),
      axios.get(`/trakt/movies/${slug}/comments/highest`),
      axios.get(`/trakt/movies/${slug}/people`),
      axios.get(`/trakt/movies/${slug}/ratings`),
      axios.get(`/trakt/movies/${slug}/related`),
      axios.get(`/trakt/movies/${slug}/stats`),
    ]);
    return {
      comments: commentsResponse.data,
      people: peopleResponse.data,
      ratings: ratingsResponse.data,
      related: relatedResponse.data,
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
    [fetchMovie.fulfilled](state, action) {
      return action.payload;
    },
  },
  initialState: {
    comments: [],
    people: null,
    ratings: null,
    related: [],
    stats: null,
    summary: null,
  },
  name: 'movie',
  reducers: {},
});

export { fetchComments, fetchMovie };
export default reducer;
