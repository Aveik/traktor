import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { DEFAULTS, getUserSlug } from '../../../../utils';

const fetchComments = createAsyncThunk(
  'profile/comments/fetch',
  async function (page, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `/trakt/users/${getUserSlug()}/comments?page=${page}&limit=${
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
  },
);

const postComment = createAsyncThunk('profile/comments/post', async function (
  { comment, entity, slug, spoiler = false },
  { rejectWithValue },
) {
  try {
    const response = await axios.post('/trakt/comments', {
      comment,
      [entity]: [{ ids: { slug } }],
      spoiler,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const removeComment = createAsyncThunk(
  'profile/comments/remove',
  async function (id, { rejectWithValue }) {
    try {
      await axios.delete(`/trakt/comments/${id}`);
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

const updateComment = createAsyncThunk(
  'profile/comments/update',
  async function ({ comment, id, spoiler }, { rejectWithValue }) {
    try {
      const response = await axios.put(`/trakt/comments/${id}`, {
        comment,
        spoiler,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  },
);

const { reducer } = createSlice({
  extraReducers: {
    [removeComment.fulfilled](state, action) {
      const { arg: id } = action.meta;
      const index = state.entities.findIndex((comment) => comment.id === id);
      delete state.entities[index];
    },
    [fetchComments.fulfilled](state, action) {
      state.entities = action.payload.entities;
      state.pagination.total = action.payload.total;
    },
    [postComment.fulfilled](state, action) {
      state.entities.push(action.payload);
    },
    [updateComment.fulfilled](state, action) {
      const index = state.entities.findIndex(
        (comment) => comment.id === action.payload.id,
      );
      state.entities[index] = action.payload;
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

export { fetchComments, postComment, removeComment, updateComment };
export default reducer;
