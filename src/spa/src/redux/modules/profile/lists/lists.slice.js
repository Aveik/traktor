import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserSlug } from '../../../../utils';

const fetchLists = createAsyncThunk('profile/lists/fetch', async function (
  type,
  { rejectWithValue },
) {
  try {
    const response = await axios.get(`/trakt/users/${getUserSlug()}/lists`);
    const listItems = await Promise.all(
      response.data.map((list) =>
        axios.get(`/trakt/users/${getUserSlug()}/lists/${list.ids.slug}/items`),
      ),
    );
    return response.data.map((list, index) => ({
      ...list,
      items: listItems[index].data,
    }));
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const addList = createAsyncThunk('profile/lists/add', async function (
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

const removeList = createAsyncThunk('profile/lists/remove', async function (
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
      return action.payload;
    },
    [removeList.fulfilled](state, action) {
      const { arg: slug } = action.meta;
      const index = state.findIndex((list) => list.ids.slug === slug);
      state.splice(index, 1);
    },
  },
  initialState: [],
  name: 'profile/lists',
  reducers: {},
});

export { addList, fetchLists, removeList };
export default reducer;
