import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchMovies = createAsyncThunk('movies/fetch', async function (
  type,
  { rejectWithValue },
) {
  try {
    const response = await axios.get(`/trakt/movies/${type}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchMovies.fulfilled](state, action) {
      state.entities = action.payload;
    },
  },
  initialState: {
    entities: [],
  },
  name: 'movies',
  reducers: {},
});

export { fetchMovies };
export default reducer;
