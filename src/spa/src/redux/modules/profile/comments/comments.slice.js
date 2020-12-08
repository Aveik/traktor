import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { DEFAULTS } from '../../../../utils';
import { selectUserSlug } from '../../../auth/auth.selectors';

const fetchComments = createAsyncThunk(
  'profile/comments/fetch',
  async function (page, { getState, rejectWithValue }) {
    try {
      const userSlug = selectUserSlug(getState());
      const response = await axios.get(
        `/users/${userSlug}/comments?page=${page}&limit=${DEFAULTS.PAGE_SIZE}`,
      );
      return {
        entities: response.data,
        total: parseInt(response.headers['x-pagination-page-count']),
      };
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

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
  name: 'profile/comments',
  reducers: {},
});

export { fetchComments };
export default reducer;
