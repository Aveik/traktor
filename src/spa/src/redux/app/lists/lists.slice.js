import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { filterOutUnsupportedEntityTypes, getUserSlug } from '../../../utils';

const fetchLists = createAsyncThunk('app/lists/fetch', async function (
  _,
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
      items: filterOutUnsupportedEntityTypes(listItems[index].data),
    }));
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchLists.fulfilled](state, action) {
      return action.payload;
    },
  },
  initialState: [],
  name: 'app/lists',
  reducers: {},
});

export { fetchLists };
export default reducer;
