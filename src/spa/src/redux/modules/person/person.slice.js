import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchPerson = createAsyncThunk('person/fetch', async function (
  slug,
  { rejectWithValue },
) {
  try {
    const [summaryResponse, moviesResponse, showsResponse] = await Promise.all([
      axios.get(`/people/${slug}?extended=full`),
      axios.get(`/people/${slug}/movies`),
      axios.get(`/people/${slug}/shows`),
    ]);
    return {
      movies: moviesResponse.data,
      shows: showsResponse.data,
      summary: summaryResponse.data,
    };
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchPerson.fulfilled](state, action) {
      return action.payload;
    },
  },
  initialState: {
    movies: [],
    shows: [],
    summary: null,
  },
  name: 'person',
  reducers: {},
});

export { fetchPerson };
export default reducer;
