import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function resolveType(type) {
  switch (type) {
    case 'movies':
      return 'movie';
    case 'shows':
      return 'show';
    case 'people':
      return 'person';
    default:
      return 'movie,show,person';
  }
}

const fetchSearchResults = createAsyncThunk('search/fetch', async function (
  { query, type },
  { rejectWithValue },
) {
  try {
    const response = await axios.get(
      `/trakt/search/${resolveType(type)}?query=${query}`,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchSearchResults.fulfilled](state, action) {
      state.entities = action.payload;
    },
  },
  initialState: {
    entities: [],
  },
  name: 'search',
  reducers: {},
});

export { fetchSearchResults };
export default reducer;
