import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { DEFAULTS, getUserSlug } from '../../../../../utils';
import { isForLoggedUser } from '../../utils';

const fetchComments = createAsyncThunk('users/comments/fetch', async function (
  { page, userSlug = getUserSlug() },
  { rejectWithValue },
) {
  try {
    const response = await axios.get(
      `/trakt/users/${userSlug}/comments?page=${page}&limit=${DEFAULTS.PAGE_SIZE}`,
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
    [fetchComments.fulfilled](state, action) {
      if (isForLoggedUser(action.meta.arg.userSlug)) {
        return state;
      }
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
  name: 'users/comments',
  reducers: {},
});

export { fetchComments };
export default reducer;
