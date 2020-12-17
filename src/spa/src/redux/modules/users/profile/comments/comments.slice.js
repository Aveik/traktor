import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { transformEntityToSingular } from '../../../../../utils';
import { fetchComments } from '../../user/comments/comments.slice';
import { isForLoggedUser } from '../../utils';

const postComment = createAsyncThunk('users/comments/post', async function (
  { comment, entity, slug, spoiler = false },
  { rejectWithValue },
) {
  entity = transformEntityToSingular(entity);
  try {
    const response = await axios.post('/trakt/comments', {
      comment,
      [entity]: { ids: { slug } },
      spoiler,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const removeComment = createAsyncThunk('users/comments/remove', async function (
  id,
  { rejectWithValue },
) {
  try {
    await axios.delete(`/trakt/comments/${id}`);
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const updateComment = createAsyncThunk('users/comments/update', async function (
  { comment, id, spoiler },
  { rejectWithValue },
) {
  try {
    const response = await axios.put(`/trakt/comments/${id}`, {
      comment,
      spoiler,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchComments.fulfilled](state, action) {
      if (isForLoggedUser(action.meta.arg.userSlug)) {
        state.entities = action.payload.entities;
        state.pagination.total = action.payload.total;
      }
      return state;
    },
    [removeComment.fulfilled](state, action) {
      const { arg: id } = action.meta;
      const index = state.entities.findIndex(
        ({ comment }) => comment.id === id,
      );
      if (index !== -1) {
        state.entities.splice(index, 1);
      }
    },
    [updateComment.fulfilled](state, action) {
      const index = state.entities.findIndex(
        ({ comment }) => comment.id === action.payload.id,
      );
      if (index !== -1) {
        state.entities[index].comment = action.payload;
      }
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

export { fetchComments, postComment, removeComment, updateComment };
export default reducer;
