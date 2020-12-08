import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { selectUserSlug } from '../../../auth/auth.selectors';

const fetchLists = createAsyncThunk('profile/lists/fetch', async function (
  _,
  { getState, rejectWithValue },
) {
  try {
    const userSlug = selectUserSlug(getState());
    const response = await axios.get(`/users/${userSlug}/lists`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const addList = createAsyncThunk('profile/lists/add', async function (
  list,
  { getState, rejectWithValue },
) {
  try {
    const userSlug = selectUserSlug(getState());
    const response = await axios.post(`/users/${userSlug}/lists`, list);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const removeList = createAsyncThunk('profile/lists/remove', async function (
  slug,
  { getState, rejectWithValue },
) {
  try {
    const userSlug = selectUserSlug(getState());
    await axios.delete(`/users/${userSlug}/lists/${slug}`);
    return slug;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [addList.fulfilled](state, action) {
      state.push(action.payload);
    },
    [fetchLists.fulfilled](state, action) {
      return action.payload;
    },
    [removeList.fulfilled](state, action) {
      const index = state.findIndex((list) => list.ids.slug === action.payload);
      delete state[index];
    },
  },
  initialState: [],
  name: 'profile/lists',
  reducers: {},
});

export { addList, fetchLists, removeList };
export default reducer;
