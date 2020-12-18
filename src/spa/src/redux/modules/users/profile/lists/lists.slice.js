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

const updateList = createAsyncThunk('users/lists/update', async function (
  { description, name, privacy, slug },
  { rejectWithValue },
) {
  try {
    const response = await axios.put(
      `/trakt/users/${getUserSlug()}/lists/${slug}`,
      { description, name, privacy, slug },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [addList.fulfilled](state, action) {
      state.push({ ...action.payload, items: [] });
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
    [updateList.fulfilled](state, action) {
      const { slug } = action.meta.arg;
      const index = state.findIndex((list) => list.ids.slug === slug);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
  },
  initialState: [],
  name: 'users/lists',
  reducers: {},
});

export { addList, removeList, updateList };
export default reducer;
