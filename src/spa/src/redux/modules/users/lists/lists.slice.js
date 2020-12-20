import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { filterOutUnsupportedEntityTypes } from '../../../../utils';

const fetchLists = createAsyncThunk('users/lists/fetch', async function (
  { limit = 5, page = 1, userSlug },
  { rejectWithValue },
) {
  try {
    const response = await axios.get(`/trakt/users/${userSlug}/lists`);
    const listItems = await Promise.all(
      response.data.map((list) =>
        axios.get(
          `/trakt/users/${userSlug}/lists/${list.ids.slug}/items?page=${page}&limit=${limit}`,
        ),
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
  name: 'users/lists',
  reducers: {},
});

export { fetchLists };
export default reducer;
