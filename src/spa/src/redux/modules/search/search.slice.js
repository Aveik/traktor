import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { DEFAULTS } from '../../../utils';

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
  { page, query, type },
  { rejectWithValue },
) {
  try {
    const response = await axios.get(
      `/trakt/search/${resolveType(type)}?query=${query}&page=${page}&limit=${
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
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchSearchResults.fulfilled](state, action) {
      state.entities = action.payload.entities;
      state.pagination.total = action.payload.total;
    },
  },
  initialState: {
    entities: [],
    pagination: {
      total: 0,
    },
  },
  name: 'search',
  reducers: {},
});

export { fetchSearchResults };
export default reducer;
