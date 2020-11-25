import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchShows = createAsyncThunk('shows/fetch', async function (
  type,
  { rejectWithValue },
) {
  try {
    const response = await axios.get(`/trakt/shows/${type}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchShows.fulfilled](state, action) {
      state.entities = action.payload;
    },
  },
  initialState: {
    entities: [],
  },
  name: 'shows',
  reducers: {},
});

export { fetchShows };
export default reducer;
