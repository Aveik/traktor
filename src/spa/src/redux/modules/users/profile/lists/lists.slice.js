import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserSlug } from '../../../../../utils';
import { fetchLists } from '../../user/lists/lists.slice';
import { isForLoggedUser } from '../../utils';

const addList = createAsyncThunk('users/lists/add', async function (
  list,
  { rejectWithValue },
) {
  try {
    const response = await axios.post(
      `/trakt/users/${getUserSlug()}/lists`,
      list,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const removeList = createAsyncThunk('users/lists/remove', async function (
  slug,
  { rejectWithValue },
) {
  try {
    await axios.delete(`/trakt/users/${getUserSlug()}/lists/${slug}`);
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
      if (isForLoggedUser(action.meta.arg)) {
        return action.payload;
      }
      return state;
    },
    [removeList.fulfilled](state, action) {
      const { arg: slug } = action.meta;
      const index = state.findIndex((list) => list.ids.slug === slug);
      state.splice(index, 1);
    },
  },
  initialState: [],
  name: 'users/lists',
  reducers: {},
});

export { addList, removeList };
export default reducer;
