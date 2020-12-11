import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchMovie = createAsyncThunk('movie/fetch', async function (
  slug,
  { rejectWithValue },
) {
  try {
    const statsResponse = await axios.get(`/trakt/movies/${slug}/stats`);
    const { comments: limit } = statsResponse.data;
    const [
      summaryResponse,
      commentsResponse,
      peopleResponse,
      ratingsResponse,
      relatedResponse,
    ] = await Promise.all([
      axios.get(`/trakt/movies/${slug}`),
      axios.get(`/trakt/movies/${slug}/comments/highest?limit=${limit}`),
      axios.get(`/trakt/movies/${slug}/people`),
      axios.get(`/trakt/movies/${slug}/ratings`),
      axios.get(`/trakt/movies/${slug}/related`),
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

export { fetchMovie };
export default reducer;
