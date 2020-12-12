import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { DEFAULTS } from '../../../utils';
import { fetchMovie } from '../movie/movie.slice';

const fetchComments = createAsyncThunk('comments/fetch', async function (
  { entity, page, slug, sort },
  { rejectWithValue },
) {
  try {
    const response = await axios.get(
      `/trakt/${entity}/${slug}/comments/${sort}?page=${page}&limit=${DEFAULTS.COMMENT_PAGE_SIZE}`,
    );
    return {
      entities: response.data,
      total: parseInt(response.headers['x-pagination-page-count']),
    };
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

function fetchMovieAndComments(args) {
  return async function (dispatch) {
    await Promise.all([
      dispatch(fetchMovie(args.slug)),
      dispatch(fetchComments(args)),
    ]);
  };
}

const { reducer } = createSlice({
  extraReducers: {
    [fetchComments.fulfilled](state, action) {
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
  name: 'comments',
  reducers: {},
});

export { fetchComments, fetchMovieAndComments };
export default reducer;
